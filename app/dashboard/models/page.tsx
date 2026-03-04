'use client'

import { useState, useMemo } from 'react'
import useSWR from 'swr'
import { useDashboard } from '@/lib/dashboard-context'
import { AuthGuard } from '@/components/dashboard/auth-guard'
import { MODEL_CATALOG, PROVIDERS, type Capability } from '@/lib/model-catalog'

const CAP_META: Record<Capability, { label: string; bg: string; text: string }> = {
  vision:    { label: 'Vision',    bg: 'rgba(59,130,246,0.12)',  text: '#3b82f6' },
  tools:     { label: 'Tools',     bg: 'rgba(34,197,94,0.12)',   text: '#16a34a' },
  reasoning: { label: 'Thinking',  bg: 'rgba(168,85,247,0.12)',  text: '#9333ea' },
  audio:     { label: 'Audio',     bg: 'rgba(234,179,8,0.12)',   text: '#ca8a04' },
  embedding: { label: 'Embed',     bg: 'rgba(99,102,241,0.12)',  text: '#6366f1' },
}

function CapBadge({ cap }: { cap: Capability }) {
  const m = CAP_META[cap]
  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide"
      style={{ backgroundColor: m.bg, color: m.text }}
    >
      {m.label}
    </span>
  )
}

function RatioChip({ ratio }: { ratio: number }) {
  const color = ratio <= 0.1 ? '#16a34a' : ratio <= 0.5 ? '#0ea5e9' : ratio <= 2 ? '#d97706' : '#dc2626'
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-semibold"
      style={{ backgroundColor: `${color}18`, color }}
    >
      ×{ratio}
    </span>
  )
}

export default function ModelsPage() {
  return (
    <AuthGuard>
      <ModelsContent />
    </AuthGuard>
  )
}

function ModelsContent() {
  const { apiKey } = useDashboard()
  const [filterProvider, setFilterProvider] = useState<string>('All')
  const [filterCap, setFilterCap] = useState<Capability | 'All'>('All')
  const [filterNew, setFilterNew] = useState(false)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'input' | 'ratio'>('name')

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
        if (filterNew && !info.new) return false
        if (search) {
          const q = search.toLowerCase()
          return id.toLowerCase().includes(q) || info.provider.toLowerCase().includes(q) || (info.description ?? '').toLowerCase().includes(q)
        }
        return true
      })
      .sort(([aId, a], [bId, b]) => {
        if (sortBy === 'input') return a.input - b.input
        if (sortBy === 'ratio') return a.ratio - b.ratio
        return aId.localeCompare(bId)
      })
  }, [allEntries, filterProvider, filterCap, filterNew, search, sortBy])

  const totalCount = allEntries.length
  const filteredCount = rows.length

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted-text)', letterSpacing: '0.1em' }}>
          Model Marketplace
        </p>
        <div className="flex items-end gap-4 flex-wrap">
          <h1 className="text-2xl font-bold" style={{ letterSpacing: '-0.025em' }}>
            {totalCount} Models Available
          </h1>
          {availableSet.size > 0 && (
            <p className="text-sm mb-0.5" style={{ color: 'var(--muted-text)' }}>
              {availableSet.size} accessible with your key
            </p>
          )}
        </div>
      </div>

      {/* Filter bar */}
      <div className="space-y-3 mb-6">

        {/* Row 1: Search + sort + new toggle */}
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search models..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-9 px-3.5 rounded-lg text-sm border outline-none flex-1"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)', minWidth: '180px', maxWidth: '280px' }}
          />

          {/* Sort */}
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-xs" style={{ color: 'var(--muted-text)' }}>Sort:</span>
            {([['name', 'Name'], ['input', 'Price ↑'], ['ratio', 'Ratio ↑']] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className="h-8 px-3 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor: sortBy === key ? 'var(--foreground)' : 'var(--surface)',
                  color: sortBy === key ? 'var(--background)' : 'var(--muted-text)',
                  border: `1px solid ${sortBy === key ? 'var(--foreground)' : 'var(--border)'}`,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* New toggle */}
          <button
            onClick={() => setFilterNew(v => !v)}
            className="h-8 px-3 rounded-lg text-xs font-medium transition-all"
            style={{
              backgroundColor: filterNew ? 'rgba(255,79,0,0.12)' : 'var(--surface)',
              color: filterNew ? '#FF4F00' : 'var(--muted-text)',
              border: `1px solid ${filterNew ? 'rgba(255,79,0,0.4)' : 'var(--border)'}`,
            }}
          >
            🆕 New
          </button>
        </div>

        {/* Row 2: Provider tabs */}
        <div className="flex flex-wrap gap-1.5">
          {['All', ...PROVIDERS].map(p => {
            const color = p === 'All' ? undefined
              : Object.values(MODEL_CATALOG).find(m => m.provider === p)?.providerColor
            const active = filterProvider === p
            return (
              <button
                key={p}
                onClick={() => setFilterProvider(p)}
                className="h-8 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                style={{
                  backgroundColor: active ? (color ?? '#FF4F00') + '22' : 'var(--surface)',
                  color: active ? (color ?? '#FF4F00') : 'var(--muted-text)',
                  border: `1px solid ${active ? (color ?? '#FF4F00') + '66' : 'var(--border)'}`,
                }}
              >
                {color && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                )}
                {p}
              </button>
            )
          })}
        </div>

        {/* Row 3: Capability filter */}
        <div className="flex flex-wrap gap-1.5">
          {([['All', 'All Capabilities'], ...Object.entries(CAP_META).map(([k, v]) => [k, v.label])] as [string, string][]).map(([key, label]) => {
            const active = filterCap === key
            const meta = key !== 'All' ? CAP_META[key as Capability] : null
            return (
              <button
                key={key}
                onClick={() => setFilterCap(key as Capability | 'All')}
                className="h-8 px-3 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor: active ? (meta?.bg ?? 'var(--foreground)') : 'var(--surface)',
                  color: active ? (meta?.text ?? 'var(--background)') : 'var(--muted-text)',
                  border: `1px solid ${active ? (meta?.text ?? 'var(--foreground)') + '66' : 'var(--border)'}`,
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs mb-3" style={{ color: 'var(--muted-text)' }}>
        Showing {filteredCount} of {totalCount} models
      </p>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
        {/* Header */}
        <div
          className="grid text-xs font-semibold uppercase px-4 py-2.5 border-b"
          style={{
            gridTemplateColumns: '2.5fr 90px 70px 70px 100px 100px 1fr',
            color: 'var(--muted-text)',
            letterSpacing: '0.06em',
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface-alt)',
          }}
        >
          <span>Model</span>
          <span>Provider</span>
          <span>Context</span>
          <span>倍率</span>
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
            return (
              <div
                key={id}
                className="grid items-center px-4 py-3 border-b last:border-0 transition-colors"
                style={{
                  gridTemplateColumns: '2.5fr 90px 70px 70px 100px 100px 1fr',
                  borderColor: 'var(--border)',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-alt)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {/* Model name */}
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-mono font-medium truncate">{id}</p>
                    {info.featured && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(255,79,0,0.12)', color: '#FF4F00' }}>
                        Featured
                      </span>
                    )}
                    {info.new && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a' }}>
                        New
                      </span>
                    )}
                    {data && !available && (
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(156,163,175,0.12)', color: 'var(--muted-text)' }}>
                        Unavailable
                      </span>
                    )}
                  </div>
                  {info.description && (
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--muted-text)' }}>{info.description}</p>
                  )}
                </div>

                {/* Provider */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: info.providerColor }} />
                  <span className="text-xs truncate" style={{ color: 'var(--foreground)' }}>{info.provider}</span>
                </div>

                {/* Context */}
                <span className="text-xs font-mono" style={{ color: 'var(--muted-text)' }}>{info.context}</span>

                {/* 倍率 */}
                <div><RatioChip ratio={info.ratio} /></div>

                {/* Input price */}
                <span className="text-sm font-mono font-medium">
                  {info.input > 0 ? `$${info.input % 1 === 0 ? info.input.toFixed(2) : info.input.toFixed(info.input < 1 ? 3 : 2)}` : <span style={{ color: 'var(--muted-text)' }}>—</span>}
                </span>

                {/* Output price */}
                <span className="text-sm font-mono font-medium" style={{ color: 'var(--muted-text)' }}>
                  {info.output > 0 ? `$${info.output % 1 === 0 ? info.output.toFixed(2) : info.output.toFixed(info.output < 1 ? 3 : 2)}` : <span>—</span>}
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

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs" style={{ color: 'var(--muted-text)' }}>
          Prices are ArkeAPI relay rates (via VectorEngine). Ratio (倍率) is relative to $2/1M baseline.
        </p>
        <p className="text-xs" style={{ color: 'var(--muted-text)' }}>
          Updated March 2025
        </p>
      </div>
    </div>
  )
}
