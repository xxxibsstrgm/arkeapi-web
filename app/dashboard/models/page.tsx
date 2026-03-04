'use client'

import { useState, useMemo, useCallback } from 'react'
import useSWR from 'swr'
import { useDashboard } from '@/lib/dashboard-context'
import { AuthGuard } from '@/components/dashboard/auth-guard'
import { MODEL_CATALOG, PROVIDERS, type Capability, type PricingType } from '@/lib/model-catalog'

// ── Provider SVG logos ───────────────────────────────────────────────────
const PROVIDER_PATHS: Record<string, string> = {
  OpenAI:         'M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.77 19.9a4.5 4.5 0 0 1-6.17-1.596zm-1.15-9.847a4.485 4.485 0 0 1 2.341-1.97V12.3a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.45 8.457zm16.57 3.866-5.837-3.37L15.2 7.79a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.684zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.785 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z',
  'OpenAI Plus':  'M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.77 19.9a4.5 4.5 0 0 1-6.17-1.596zm-1.15-9.847a4.485 4.485 0 0 1 2.341-1.97V12.3a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.45 8.457zm16.57 3.866-5.837-3.37L15.2 7.79a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.684zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.785 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z',
  Anthropic:      'M17.304 3.541 24 20.459h-4.1l-1.412-3.529H9.737L8.325 20.46H4.248L10.92 3.54zm-5.82 9.608h3.88L13.428 7.6z',
  Google:         'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053z',
  xAI:            'M14.258 10.152 23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309H24L14.258 10.152zm-2.895 3.293-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246l-6.453-9.044z',
  Mistral:        'M0 0h4v4H0zm6 0h4v4H6zM0 6h4v4H0zm6 0h4v4H6zm6 0h4v4h-4zm6 0h4v4h-4zM6 12h4v4H6zm6 0h4v4h-4zM0 18h4v4H0zm6 0h4v4H6zm6 0h4v4h-4zm6 0h4v4h-4z',
  Meta:           'M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.086 1.45.25 2.122.408 1.683 1.298 2.826 2.477 2.826.763 0 1.494-.298 2.405-1.484.516-.69 1.032-1.564 1.306-2.323l.34-.992.344.986c.4 1.14.995 2.177 1.7 2.886.7.704 1.502 1.07 2.378 1.07.966 0 1.86-.4 2.568-1.162.697-.753 1.152-1.85 1.39-3.17.046-.254.073-.51.073-.78 0-1.145-.273-2.28-.74-3.19-.543-1.055-1.305-1.67-2.16-1.67-.574 0-1.123.268-1.647.804-.252.26-.504.573-.76.93v-.867c0-1.054-.39-2.01-1.04-2.674-.65-.665-1.556-1.047-2.508-1.047zm0 1.8c.586 0 1.13.233 1.542.647.412.415.637.973.637 1.567V12c.518-.842 1.004-1.519 1.43-2.018.598-.704 1.14-1.032 1.64-1.032.43 0 .847.258 1.198.784.35.525.6 1.296.6 2.252 0 .182-.018.37-.046.556-.18 1.04-.53 1.846-1.016 2.382-.487.535-1.096.836-1.796.836-.607 0-1.177-.24-1.72-.8-.546-.558-1.066-1.476-1.47-2.686l-.7-2.003-.752 2.183c-.274.798-.74 1.633-1.233 2.293-.664.887-1.162 1.25-1.662 1.25-.647 0-1.19-.74-1.49-1.923a8.548 8.548 0 0 1-.207-1.793c0-2.298.618-4.676 1.832-6.394.68-.975 1.524-1.617 2.213-1.617z',
  DeepSeek:       'M23.748 9.817c-.386.048-.74.172-1.058.388-.285.192-.57.432-.907.695-1.035.814-1.874 1.225-3.04 1.24-.52.008-1.053-.08-1.616-.336-1.01-.455-1.73-.91-2.35-1.29-.4-.244-.756-.456-1.11-.624-.604-.28-1.167-.44-1.778-.44-.988 0-1.843.367-2.605.863-.044.026-.09.047-.135.07.1-.33.254-.636.456-.91l.004-.005c.13-.176.278-.34.44-.49l.002-.002a4.35 4.35 0 0 1 2.903-1.104c.456 0 .91.072 1.362.218.44.14.898.35 1.386.582l.012.007c.507.246 1.052.447 1.622.523.57.077 1.178.042 1.812-.168.632-.21 1.166-.553 1.594-.947.43-.393.75-.836.9-1.242.08-.217.12-.427.11-.62a.983.983 0 0 0-.11-.437 2.36 2.36 0 0 0-.347-.498c-.156-.174-.352-.35-.592-.507.237.016.476.07.72.177.338.15.673.393.98.73.304.336.574.764.774 1.28l.003.007.003.007c.074.195.142.4.208.612.15.47.298.985.527 1.434.46.905 1.118 1.63 2.32 1.89.106.022.21.04.31.055.2.03.38.05.545.06v.002zM4.615 13.85c-.228.17-.444.313-.65.428-.536.3-1.024.406-1.49.302-.463-.104-.85-.396-1.2-.811-.27-.32-.5-.7-.71-1.094l-.003-.007c-.29-.546-.613-1.11-1.05-1.565C-.057 10.41-.295 9.978-.34 9.5c-.045-.48.094-1.02.52-1.618.284-.395.65-.78 1.09-1.126.44-.347.945-.657 1.5-.893.843-.358 1.807-.547 2.773-.462.962.083 1.94.444 2.802 1.176a.57.57 0 0 0-.043.046 4.57 4.57 0 0 0-.487.785 4.61 4.61 0 0 0-.34 1.09 4.54 4.54 0 0 0-.025 1.156c.05.425.165.84.344 1.227a4.467 4.467 0 0 0 1.26 1.616c-.453.017-.888.122-1.267.294a4.38 4.38 0 0 0-.997.646l-.003.003-.003.002z',
}

function Logo({ provider, color, size = 22 }: { provider: string; color: string; size?: number }) {
  const path = PROVIDER_PATHS[provider]
  const letter = provider === 'Kimi' ? 'K' : provider === 'Qwen' ? 'Q'
    : provider === 'Flux' ? 'F' : provider === 'ByteDance' ? 'B'
    : provider === 'Ollama' ? 'O' : provider[0]

  const isDark = color === '#111111' || color === '#1a1a1a' || color === '#000000'

  if (!path) {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, flexShrink: 0,
        borderRadius: '50%',
        backgroundColor: color + '18', border: `1.5px solid ${color}35`,
        fontSize: Math.round(size * 0.44), fontWeight: 700, color,
        fontFamily: 'var(--font-space-grotesk, sans-serif)',
        letterSpacing: '-0.3px',
      }}>
        {letter}
      </span>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}
      className={isDark ? 'dark:invert' : ''}
      style={{ flexShrink: 0 }}>
      <path d={path} />
    </svg>
  )
}

// ── Capability badges ────────────────────────────────────────────────────
const CAP_META: Record<Capability, { label: string; bg: string; text: string }> = {
  vision:      { label: 'Vision',   bg: 'rgba(59,130,246,0.12)',  text: '#3b82f6' },
  tools:       { label: 'Tools',    bg: 'rgba(34,197,94,0.12)',   text: '#16a34a' },
  reasoning:   { label: 'Thinking', bg: 'rgba(168,85,247,0.12)',  text: '#9333ea' },
  audio:       { label: 'Audio',    bg: 'rgba(234,179,8,0.12)',   text: '#ca8a04' },
  embedding:   { label: 'Embed',    bg: 'rgba(99,102,241,0.12)',  text: '#6366f1' },
  'image-gen': { label: 'Image',    bg: 'rgba(236,72,153,0.12)', text: '#db2777' },
  'video-gen': { label: 'Video',    bg: 'rgba(239,68,68,0.12)',  text: '#dc2626' },
}

function CapBadge({ cap }: { cap: Capability }) {
  const m = CAP_META[cap]
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide whitespace-nowrap"
      style={{ backgroundColor: m.bg, color: m.text }}>
      {m.label}
    </span>
  )
}

// ── Pricing type ─────────────────────────────────────────────────────────
const PRICING_META: Record<PricingType, { label: string; short: string; bg: string; text: string }> = {
  'token':       { label: 'Pay per Token',   short: 'Token',  bg: 'rgba(15,118,110,0.10)', text: '#0f766e' },
  'per-image':   { label: 'Pay per Image',   short: 'Image',  bg: 'rgba(147,51,234,0.10)', text: '#9333ea' },
  'per-video':   { label: 'Pay per Video',   short: 'Video',  bg: 'rgba(220,38,38,0.10)',  text: '#dc2626' },
  'per-request': { label: 'Pay per Request', short: 'Req',    bg: 'rgba(180,83,9,0.10)',   text: '#b45309' },
}

// ── Copy button ──────────────────────────────────────────────────────────
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
    <button onClick={copy} title="Copy model ID"
      className="opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity ml-1 shrink-0 text-xs"
      style={{ color: 'var(--muted-text)' }}>
      {copied ? '✓' : '⎘'}
    </button>
  )
}

function fmt(n: number) {
  if (n === 0) return '—'
  if (n < 0.01) return `$${n.toFixed(4)}`
  if (n < 1)    return `$${n.toFixed(3)}`
  return `$${n.toFixed(2)}`
}

// ── View toggle icons ────────────────────────────────────────────────────
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke={active ? 'var(--foreground)' : 'var(--muted-text)'} strokeWidth="1.5">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  )
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke={active ? 'var(--foreground)' : 'var(--muted-text)'} strokeWidth="1.5">
      <line x1="5" y1="4" x2="14" y2="4" />
      <line x1="5" y1="8" x2="14" y2="8" />
      <line x1="5" y1="12" x2="14" y2="12" />
      <circle cx="2" cy="4" r="1" fill={active ? 'var(--foreground)' : 'var(--muted-text)'} stroke="none" />
      <circle cx="2" cy="8" r="1" fill={active ? 'var(--foreground)' : 'var(--muted-text)'} stroke="none" />
      <circle cx="2" cy="12" r="1" fill={active ? 'var(--foreground)' : 'var(--muted-text)'} stroke="none" />
    </svg>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────
export default function ModelsPage() {
  return <AuthGuard><ModelsContent /></AuthGuard>
}

function ModelsContent() {
  const { apiKey } = useDashboard()
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [filterProvider, setFilterProvider] = useState<string>('All')
  const [filterCap, setFilterCap] = useState<Capability | 'All'>('All')
  const [filterType, setFilterType] = useState<PricingType | 'All'>('All')
  const [filterNew, setFilterNew] = useState(false)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'input'>('name')

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
        return aId.localeCompare(bId)
      })
  }, [allEntries, filterProvider, filterCap, filterType, filterNew, search, sortBy])

  const tokenCount = allEntries.filter(([, m]) => m.pricingType === 'token').length
  const imageCount = allEntries.filter(([, m]) => m.pricingType !== 'token').length

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted-text)', letterSpacing: '0.1em' }}>
          Model Marketplace
        </p>
        <div className="flex items-end gap-4 flex-wrap">
          <h1 className="text-2xl font-bold" style={{ letterSpacing: '-0.025em' }}>
            {allEntries.length} Models
          </h1>
          <p className="text-sm mb-0.5" style={{ color: 'var(--muted-text)' }}>
            {tokenCount} token-based · {imageCount} image/video
            {availableSet.size > 0 && ` · ${availableSet.size} active with your key`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-2.5 mb-5">
        {/* Search + sort + view toggle */}
        <div className="flex flex-wrap gap-2 items-center">
          <input type="text" placeholder="Search models..." value={search}
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
            {/* View mode toggle */}
            <div className="flex items-center rounded-lg border overflow-hidden ml-1"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className="h-8 w-9 flex items-center justify-center transition-colors"
                style={{ backgroundColor: viewMode === 'grid' ? 'var(--surface-alt, rgba(0,0,0,0.05))' : 'transparent' }}
                title="Grid view"
              >
                <GridIcon active={viewMode === 'grid'} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className="h-8 w-9 flex items-center justify-center transition-colors"
                style={{ backgroundColor: viewMode === 'table' ? 'var(--surface-alt, rgba(0,0,0,0.05))' : 'transparent' }}
                title="List view"
              >
                <ListIcon active={viewMode === 'table'} />
              </button>
            </div>
          </div>
        </div>

        {/* Pricing type */}
        <div className="flex flex-wrap gap-1.5">
          {(['All', 'token', 'per-image', 'per-video', 'per-request'] as const).map(t => {
            const active = filterType === t
            const meta = t !== 'All' ? PRICING_META[t] : null
            return (
              <button key={t} onClick={() => setFilterType(t)}
                className="h-8 px-3 rounded-lg text-xs font-semibold transition-all"
                style={{
                  backgroundColor: active ? (meta?.bg ?? 'var(--foreground)') : 'var(--surface)',
                  color: active ? (meta?.text ?? 'var(--background)') : 'var(--muted-text)',
                  border: `1px solid ${active ? ((meta?.text ?? 'var(--foreground)') + '66') : 'var(--border)'}`,
                }}>
                {t === 'All' ? 'All Types' : meta!.label}
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
                  backgroundColor: active ? (color ?? '#FF4F00') + '18' : 'var(--surface)',
                  color: active ? (color ?? '#FF4F00') : 'var(--muted-text)',
                  border: `1px solid ${active ? (color ?? '#FF4F00') + '55' : 'var(--border)'}`,
                }}>
                {color && <Logo provider={p} color={active ? (color ?? '#FF4F00') : 'var(--muted-text)'} size={14} />}
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

      <p className="text-xs mb-4" style={{ color: 'var(--muted-text)' }}>
        Showing {rows.length} of {allEntries.length} models
      </p>

      {/* ── Grid view ─────────────────────────────────────────────────── */}
      {viewMode === 'grid' && (
        rows.length === 0 ? (
          <div className="py-16 text-center text-sm" style={{ color: 'var(--muted-text)' }}>
            No models match your filters.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1px',
            backgroundColor: 'var(--border)',
          }}>
            {rows.map(([id, info]) => {
              const isPerReq = info.pricingType !== 'token'
              const priceMeta = PRICING_META[info.pricingType]
              return (
                <div key={id}
                  className="group flex flex-col p-5 transition-colors"
                  style={{ backgroundColor: 'var(--surface)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-alt, rgba(0,0,0,0.03))')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--surface)')}
                >
                  {/* Provider row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: info.providerColor + '12' }}>
                        <Logo provider={info.provider} color={info.providerColor} size={20} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: info.providerColor, letterSpacing: '0.08em' }}>
                        {info.provider}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {info.featured && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'rgba(255,79,0,0.12)', color: '#FF4F00' }}>Featured</span>
                      )}
                      {info.new && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a' }}>New</span>
                      )}
                    </div>
                  </div>

                  {/* Model name */}
                  <div className="flex items-start gap-1 mb-2">
                    <span className="text-sm font-mono font-semibold leading-snug"
                      style={{ color: 'var(--foreground)', wordBreak: 'break-all' }}>
                      {id}
                    </span>
                    <CopyButton text={id} />
                  </div>

                  {/* Description */}
                  {info.description && (
                    <p className="text-xs leading-relaxed mb-3 flex-1"
                      style={{ color: 'var(--muted-text)' }}>
                      {info.description}
                    </p>
                  )}

                  {/* Price chip */}
                  <code className="text-xs font-mono px-2.5 py-1.5 rounded block border mb-3"
                    style={{
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      color: info.providerColor,
                    }}>
                    {isPerReq
                      ? `${fmt(info.pricePerRequest ?? 0)} ${info.priceUnit ?? ''}`
                      : `In: ${fmt(info.input ?? 0)}  ·  Out: ${fmt(info.output ?? 0)}${info.context ? `  ·  ${info.context}` : ''}`
                    }
                  </code>

                  {/* Bottom row: pricing type + capabilities */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap"
                      style={{ backgroundColor: priceMeta.bg, color: priceMeta.text }}>
                      {priceMeta.short}
                    </span>
                    {info.caps.map(c => <CapBadge key={c} cap={c} />)}
                  </div>
                </div>
              )
            })}
          </div>
        )
      )}

      {/* ── Table view ────────────────────────────────────────────────── */}
      {viewMode === 'table' && (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
          <div className="grid text-xs font-semibold uppercase px-5 py-2.5 border-b"
            style={{
              gridTemplateColumns: '2.6fr 110px 110px 110px 80px 1fr',
              color: 'var(--muted-text)', letterSpacing: '0.06em',
              borderColor: 'var(--border)', backgroundColor: 'var(--surface-alt, rgba(0,0,0,0.03))',
            }}>
            <span>Model</span>
            <span>Provider</span>
            <span>Input /1M</span>
            <span>Output /1M</span>
            <span>Context</span>
            <span>Capabilities</span>
          </div>

          {rows.length === 0 ? (
            <div className="px-5 py-16 text-center text-sm" style={{ color: 'var(--muted-text)' }}>
              No models match your filters.
            </div>
          ) : (
            rows.map(([id, info]) => {
              const isPerReq = info.pricingType !== 'token'
              const priceMeta = PRICING_META[info.pricingType]
              return (
                <div key={id}
                  className="group grid items-center px-5 py-3 border-b last:border-0 transition-colors"
                  style={{ gridTemplateColumns: '2.6fr 110px 110px 110px 80px 1fr', borderColor: 'var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-alt, rgba(0,0,0,0.03))')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* Model name + type badge + description */}
                  <div className="min-w-0 pr-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-mono font-medium"
                        style={{ color: 'var(--foreground)', wordBreak: 'break-all' }}>
                        {id}
                      </span>
                      <CopyButton text={id} />
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap"
                        style={{ backgroundColor: priceMeta.bg, color: priceMeta.text }}>
                        {priceMeta.short}
                      </span>
                      {info.featured && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'rgba(255,79,0,0.12)', color: '#FF4F00' }}>Featured</span>
                      )}
                      {info.new && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a' }}>New</span>
                      )}
                      {info.description && (
                        <span className="text-[11px] hidden sm:inline truncate"
                          style={{ color: 'var(--muted-text)' }}>{info.description}</span>
                      )}
                    </div>
                  </div>

                  {/* Provider */}
                  <div className="flex items-center gap-2 min-w-0">
                    <Logo provider={info.provider} color={info.providerColor} size={20} />
                    <span className="text-sm truncate" style={{ color: 'var(--foreground)' }}>{info.provider}</span>
                  </div>

                  {/* Input price */}
                  <span className="text-sm font-medium" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--foreground)' }}>
                    {isPerReq
                      ? <>{fmt(info.pricePerRequest ?? 0)}<span className="text-[10px] ml-0.5" style={{ color: 'var(--muted-text)' }}>{info.priceUnit}</span></>
                      : fmt(info.input ?? 0)
                    }
                  </span>

                  {/* Output price */}
                  <span className="text-sm" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--foreground)' }}>
                    {isPerReq ? <span style={{ color: 'var(--muted-text)' }}>—</span> : fmt(info.output ?? 0)}
                  </span>

                  {/* Context */}
                  <span className="text-xs font-mono" style={{ color: 'var(--muted-text)' }}>
                    {info.context ?? '—'}
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
      )}
    </div>
  )
}
