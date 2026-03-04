'use client'

import { useState, useMemo, useCallback } from 'react'
import useSWR from 'swr'
import { useDashboard } from '@/lib/dashboard-context'
import { AuthGuard } from '@/components/dashboard/auth-guard'
import { MODEL_CATALOG, PROVIDERS, type Capability, type PricingType } from '@/lib/model-catalog'

// ── Provider logos ──────────────────────────────────────────────────────
const PROVIDER_SYMBOLS: Record<string, { label: string; shape: 'circle' | 'square' | 'rounded' }> = {
  OpenAI:    { label: 'OA', shape: 'circle' },
  Anthropic: { label: 'An', shape: 'rounded' },
  Google:    { label: 'G',  shape: 'circle' },
  DeepSeek:  { label: 'DS', shape: 'rounded' },
  xAI:       { label: 'X',  shape: 'square' },
  Kimi:      { label: 'Ki', shape: 'circle' },
  Qwen:      { label: 'Q',  shape: 'rounded' },
  Meta:      { label: 'M',  shape: 'rounded' },
  Mistral:   { label: 'Mi', shape: 'rounded' },
  Flux:      { label: 'F',  shape: 'square' },
  ByteDance: { label: 'BD', shape: 'rounded' },
}

function ProviderLogo({ provider, color, size = 20 }: { provider: string; color: string; size?: number }) {
  const sym = PROVIDER_SYMBOLS[provider] ?? { label: provider[0].toUpperCase(), shape: 'rounded' as const }
  const radius = sym.shape === 'circle' ? '50%' : sym.shape === 'square' ? '3px' : '5px'
  const fontSize = size * (sym.label.length > 1 ? 0.38 : 0.5)
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, flexShrink: 0,
        borderRadius: radius,
        backgroundColor: color + '20',
        border: `1px solid ${color}40`,
        fontSize, fontWeight: 700, color,
        letterSpacing: '-0.3px',
        fontFamily: 'var(--font-space-grotesk, sans-serif)',
      }}
    >
      {sym.label}
    </span>
  )
}

// ── Capability badges ───────────────────────────────────────────────────
const CAP_META: Record<Capability, { label: string; bg: string; text: string }> = {
  vision:    { label: 'Vision',    bg: 'rgba(59,130,246,0.12)',  text: '#3b82f6' },
  tools:     { label: 'Tools',     bg: 'rgba(34,197,94,0.12)',   text: '#16a34a' },
  reasoning: { label: 'Thinking',  bg: 'rgba(168,85,247,0.12)',  text: '#9333ea' },
  audio:     { label: 'Audio',     bg: 'rgba(234,179,8,0.12)',   text: '#ca8a04' },
  embedding: { label: 'Embed',     bg: 'rgba(99,102,241,0.12)',  text: '#6366f1' },
  'image-gen': { label: 'Image',   bg: 'rgba(236,72,153,0.12)', text: '#db2777' },
  'video-gen': { label: 'Video',   bg: 'rgba(239,68,68,0.12)',  text: '#dc2626' },
}

function CapBadge({ cap }: { cap: Capability }) {
  const m = CAP_META[cap]
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide"
      style={{ backgroundColor: m.bg, color: m.text }}>
      {m.label}
    </span>
  )
}

// ── Pricing type badge ──────────────────────────────────────────────────
const PRICING_LABELS: Record<PricingType, { label: string; bg: string; text: string }> = {
  'token':       { label: 'Pay / Token',   bg: 'rgba(15,118,110,0.10)', text: '#0f766e' },
  'per-image':   { label: 'Pay / Image',   bg: 'rgba(147,51,234,0.10)', text: '#9333ea' },
  'per-video':   { label: 'Pay / Video',   bg: 'rgba(220,38,38,0.10)',  text: '#dc2626' },
  'per-request': { label: 'Pay / Request', bg: 'rgba(180,83,9,0.10)',   text: '#b45309' },
}

function PricingTypeBadge({ type }: { type: PricingType }) {
  const m = PRICING_LABELS[type]
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap"
      style={{ backgroundColor: m.bg, color: m.text }}>
      {m.label}
    </span>
  )
}

// ── Copy button ─────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [text])
  return (
    <button
      onClick={copy}
      title="Copy model ID"
      className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity ml-1.5 shrink-0"
      style={{ color: 'var(--muted-text)', fontSize: 12, lineHeight: 1 }}
    >
      {copied ? '✓' : '⎘'}
    </button>
  )
}

// ── Price display ───────────────────────────────────────────────────────
function fmt(n: number) {
  if (n === 0) return '—'
  if (n < 0.01) return `$${n.toFixed(4)}`
  if (n < 1)    return `$${n.toFixed(3)}`
  if (n % 1 === 0) return `$${n.toFixed(2)}`
  return `$${n.toFixed(2)}`
}

// ── Page ────────────────────────────────────────────────────────────────
export default function ModelsPage() {
  return <AuthGuard><ModelsContent /></AuthGuard>
}

function ModelsContent() {
  const { apiKey } = useDashboard()
  const [filterProvider, setFilterProvider] = useState<string>('All')
  const [filterCap, setFilterCap] = useState<Capability | 'All'>('All')
  const [filterType, setFilterType] = useState<PricingType | 'All'>('All')
  const [filterNew, setFilterNew] = useState(false)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'input' | 'price'>('name')

  const { data } = useSWR(
    apiKey ? ['/api/dashboard/models', apiKey] : null,
    ([url, key]) => fetch(url, { headers: { 'x-api-key': key } }).then(r => r.json()),
    { revalidateOnFocus: false }
  )
  const availableSet = useMemo(() => new Set<string>(data?.models ?? []), [data])
  const allEntries = useMemo(() => Object.entries(MODEL_CATALOG), [])

  const rows = useMemo(() => {
    return allEntries
      .filter(([id, info]) => {
        if (filterProvider !== 'All' && info.provider !== filterProvider) return false
        if (filterCap !== 'All' && !info.caps.includes(filterCap as Capability)) return false
        if (filterType !== 'All' && info.pricingType !== filterType) return false
        if (filterNew && !info.new) return false
        if (search) {
          const q = search.toLowerCase()
          return id.toLowerCase().includes(q) || info.provider.toLowerCase().includes(q) || (info.description ?? '').toLowerCase().includes(q)
        }
        return true
      })
      .sort(([aId, a], [bId, b]) => {
        if (sortBy === 'input') return (a.input ?? a.pricePerRequest ?? 0) - (b.input ?? b.pricePerRequest ?? 0)
        if (sortBy === 'price') return (a.pricePerRequest ?? a.input ?? 0) - (b.pricePerRequest ?? b.input ?? 0)
        return aId.localeCompare(bId)
      })
  }, [allEntries, filterProvider, filterCap, filterType, filterNew, search, sortBy])

  const tokenCount = allEntries.filter(([, m]) => m.pricingType === 'token').length
  const imageCount = allEntries.filter(([, m]) => m.pricingType !== 'token').length

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted-text)', letterSpacing: '0.1em' }}>
          Model Marketplace
        </p>
        <div className="flex items-end gap-4 flex-wrap">
          <h1 className="text-2xl font-bold" style={{ letterSpacing: '-0.025em' }}>
            {allEntries.length} Models
          </h1>
          <div className="flex gap-2 mb-0.5 text-sm" style={{ color: 'var(--muted-text)' }}>
            <span>{tokenCount} token-based</span>
            <span>·</span>
            <span>{imageCount} image/video</span>
            {availableSet.size > 0 && <><span>·</span><span>{availableSet.size} active with your key</span></>}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-2.5 mb-5">

        {/* Search + sort */}
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search models..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-9 px-3.5 rounded-lg text-sm border outline-none"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)', minWidth: '180px', maxWidth: '260px' }}
          />
          <div className="flex items-center gap-1 ml-auto flex-wrap">
            <span className="text-xs mr-0.5" style={{ color: 'var(--muted-text)' }}>Sort:</span>
            {(['name', 'input'] as const).map(key => (
              <button key={key} onClick={() => setSortBy(key)}
                className="h-8 px-2.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor: sortBy === key ? 'var(--foreground)' : 'var(--surface)',
                  color: sortBy === key ? 'var(--background)' : 'var(--muted-text)',
                  border: `1px solid ${sortBy === key ? 'var(--foreground)' : 'var(--border)'}`,
                }}>
                {key === 'name' ? 'Name' : 'Price ↑'}
              </button>
            ))}
            <button onClick={() => setFilterNew(v => !v)}
              className="h-8 px-2.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: filterNew ? 'rgba(34,197,94,0.12)' : 'var(--surface)',
                color: filterNew ? '#16a34a' : 'var(--muted-text)',
                border: `1px solid ${filterNew ? 'rgba(34,197,94,0.4)' : 'var(--border)'}`,
              }}>
              New
            </button>
          </div>
        </div>

        {/* Pricing type filter */}
        <div className="flex flex-wrap gap-1.5">
          {(['All', 'token', 'per-image', 'per-video'] as const).map(t => {
            const active = filterType === t
            const meta = t !== 'All' ? PRICING_LABELS[t as PricingType] : null
            return (
              <button key={t} onClick={() => setFilterType(t)}
                className="h-8 px-3 rounded-lg text-xs font-semibold transition-all"
                style={{
                  backgroundColor: active ? (meta?.bg ?? 'var(--foreground)') : 'var(--surface)',
                  color: active ? (meta?.text ?? 'var(--background)') : 'var(--muted-text)',
                  border: `1px solid ${active ? ((meta?.text ?? 'var(--foreground)') + '66') : 'var(--border)'}`,
                }}>
                {t === 'All' ? 'All Types' : PRICING_LABELS[t].label}
              </button>
            )
          })}
        </div>

        {/* Provider tabs */}
        <div className="flex flex-wrap gap-1.5">
          {(['All', ...PROVIDERS] as string[]).map(p => {
            const color = p === 'All' ? undefined : Object.values(MODEL_CATALOG).find(m => m.provider === p)?.providerColor
            const active = filterProvider === p
            return (
              <button key={p} onClick={() => setFilterProvider(p)}
                className="h-8 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                style={{
                  backgroundColor: active ? (color ?? '#FF4F00') + '20' : 'var(--surface)',
                  color: active ? (color ?? '#FF4F00') : 'var(--muted-text)',
                  border: `1px solid ${active ? (color ?? '#FF4F00') + '60' : 'var(--border)'}`,
                }}>
                {color && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />}
                {p}
              </button>
            )
          })}
        </div>

        {/* Capability filter */}
        <div className="flex flex-wrap gap-1.5">
          {(['All', ...Object.keys(CAP_META)] as string[]).map(key => {
            const active = filterCap === key
            const meta = key !== 'All' ? CAP_META[key as Capability] : null
            return (
              <button key={key} onClick={() => setFilterCap(key as Capability | 'All')}
                className="h-8 px-3 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor: active ? (meta?.bg ?? 'var(--foreground)') : 'var(--surface)',
                  color: active ? (meta?.text ?? 'var(--background)') : 'var(--muted-text)',
                  border: `1px solid ${active ? ((meta?.text ?? 'var(--foreground)') + '66') : 'var(--border)'}`,
                }}>
                {key === 'All' ? 'All Capabilities' : meta!.label}
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-xs mb-3" style={{ color: 'var(--muted-text)' }}>
        Showing {rows.length} of {allEntries.length} models
      </p>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
        {/* Header */}
        <div className="grid text-xs font-semibold uppercase px-4 py-2.5 border-b"
          style={{
            gridTemplateColumns: '2.4fr 90px 60px 90px 100px 100px 1fr',
            color: 'var(--muted-text)', letterSpacing: '0.06em',
            borderColor: 'var(--border)', backgroundColor: 'var(--surface-alt)',
          }}>
          <span>Model</span>
          <span>Provider</span>
          <span>Type</span>
          <span>Context</span>
          <span>Input /1M</span>
          <span>Output /1M</span>
          <span>Capabilities</span>
        </div>

        {rows.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm" style={{ color: 'var(--muted-text)' }}>
            No models match your filters.
          </div>
        ) : (
          rows.map(([id, info]) => {
            const available = availableSet.has(id)
            const isPerReq = info.pricingType !== 'token'
            return (
              <div
                key={id}
                className="group grid items-center px-4 py-3 border-b last:border-0 transition-colors"
                style={{ gridTemplateColumns: '2.4fr 90px 60px 90px 100px 100px 1fr', borderColor: 'var(--border)' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-alt)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {/* Model name + copy */}
                <div className="min-w-0 pr-3">
                  <div className="flex items-center flex-wrap gap-1.5">
                    <span className="text-sm font-mono font-medium truncate">{id}</span>
                    <CopyButton text={id} />
                    {info.featured && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(255,79,0,0.12)', color: '#FF4F00' }}>Featured</span>
                    )}
                    {info.new && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a' }}>New</span>
                    )}
                    {data && !available && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(156,163,175,0.10)', color: 'var(--muted-text)' }}>Unavailable</span>
                    )}
                  </div>
                  {info.description && (
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--muted-text)' }}>{info.description}</p>
                  )}
                </div>

                {/* Provider */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <ProviderLogo provider={info.provider} color={info.providerColor} size={18} />
                  <span className="text-xs truncate" style={{ color: 'var(--foreground)' }}>{info.provider}</span>
                </div>

                {/* Pricing type badge */}
                <div><PricingTypeBadge type={info.pricingType} /></div>

                {/* Context */}
                <span className="text-xs font-mono" style={{ color: 'var(--muted-text)' }}>
                  {info.context ?? '—'}
                </span>

                {/* Input price / per-request price */}
                <span className="text-sm font-mono font-medium" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  {isPerReq
                    ? <span style={{ color: 'var(--foreground)' }}>{fmt(info.pricePerRequest ?? 0)}<span className="text-[10px] ml-0.5" style={{ color: 'var(--muted-text)' }}>{info.priceUnit}</span></span>
                    : fmt(info.input ?? 0)
                  }
                </span>

                {/* Output price */}
                <span className="text-sm font-mono" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--foreground)' }}>
                  {isPerReq ? <span style={{ color: 'var(--muted-text)' }}>—</span> : fmt(info.output ?? 0)}
                </span>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-1">
                  {info.caps.map(c => <CapBadge key={c} cap={c} />)}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
