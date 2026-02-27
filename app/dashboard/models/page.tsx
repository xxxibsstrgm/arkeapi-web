'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { useDashboard } from '@/lib/dashboard-context'
import { AuthGuard } from '@/components/dashboard/auth-guard'
import { MODEL_CATALOG, PROVIDERS, type Capability } from '@/lib/model-catalog'

const CAPS: { key: Capability; label: string }[] = [
  { key: 'vision',    label: 'Vision' },
  { key: 'tools',     label: 'Tools' },
  { key: 'reasoning', label: 'Reasoning' },
]

function CapBadge({ cap }: { cap: Capability }) {
  const colors: Record<Capability, { bg: string; text: string }> = {
    vision:    { bg: 'rgba(59,130,246,0.12)',  text: '#3b82f6' },
    tools:     { bg: 'rgba(34,197,94,0.12)',   text: '#16a34a' },
    reasoning: { bg: 'rgba(168,85,247,0.12)',  text: '#9333ea' },
    audio:     { bg: 'rgba(234,179,8,0.12)',   text: '#ca8a04' },
    embedding: { bg: 'rgba(99,102,241,0.12)',  text: '#6366f1' },
  }
  const c = colors[cap]
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {cap}
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
  const [search, setSearch] = useState('')

  const { data } = useSWR(
    apiKey ? ['/api/dashboard/models', apiKey] : null,
    ([url, key]) => fetch(url, { headers: { 'x-api-key': key } }).then(r => r.json()),
    { revalidateOnFocus: false }
  )

  const availableIds: string[] = data?.models ?? []

  // Merge catalog info with available models
  const rows = availableIds
    .map(id => ({ id, info: MODEL_CATALOG[id] ?? null }))
    .filter(({ id, info }) => {
      if (!info) return false // hide unknown models
      if (filterProvider !== 'All' && info.provider !== filterProvider) return false
      if (filterCap !== 'All' && !info.caps.includes(filterCap as Capability)) return false
      if (search && !id.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-text)', letterSpacing: '0.1em' }}>
          Available Models
        </p>
        <h1 className="text-2xl font-bold" style={{ letterSpacing: '-0.025em' }}>
          {availableIds.length} models accessible with your key
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search models..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-9 px-3.5 rounded-lg text-sm border outline-none"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)', minWidth: '200px' }}
        />

        <div className="flex items-center gap-1.5">
          {['All', ...PROVIDERS].map(p => (
            <button
              key={p}
              onClick={() => setFilterProvider(p)}
              className="h-9 px-3.5 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: filterProvider === p ? '#ff3d00' : 'var(--surface)',
                color: filterProvider === p ? 'white' : 'var(--muted-text)',
                border: `1px solid ${filterProvider === p ? '#ff3d00' : 'var(--border)'}`,
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {[{ key: 'All' as const, label: 'All caps' }, ...CAPS].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterCap(key)}
              className="h-9 px-3.5 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: filterCap === key ? 'var(--foreground)' : 'var(--surface)',
                color: filterCap === key ? 'var(--background)' : 'var(--muted-text)',
                border: `1px solid ${filterCap === key ? 'var(--foreground)' : 'var(--border)'}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
        {/* Header row */}
        <div
          className="grid text-xs font-semibold uppercase px-5 py-3 border-b"
          style={{
            gridTemplateColumns: '2fr 100px 80px 90px 90px 1fr',
            color: 'var(--muted-text)',
            letterSpacing: '0.06em',
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface-alt)',
          }}
        >
          <span>Model</span>
          <span>Provider</span>
          <span>Context</span>
          <span>Input /1M</span>
          <span>Output /1M</span>
          <span>Capabilities</span>
        </div>

        {rows.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm" style={{ color: 'var(--muted-text)' }}>
            {availableIds.length === 0 ? 'Loading models...' : 'No models match your filters.'}
          </div>
        ) : (
          rows.map(({ id, info }) => (
            <div
              key={id}
              className="grid items-center px-5 py-3.5 border-b last:border-0 hover:bg-black/[0.02] transition-colors"
              style={{
                gridTemplateColumns: '2fr 100px 80px 90px 90px 1fr',
                borderColor: 'var(--border)',
              }}
            >
              <div>
                <p className="text-sm font-mono font-medium">{id}</p>
                {info?.description && (
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-text)' }}>{info.description}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: info?.providerColor }}
                />
                <span className="text-sm">{info?.provider}</span>
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--muted-text)' }}>{info?.context}</span>
              <span className="text-sm font-mono">
                {info && info.input > 0 ? `$${info.input.toFixed(3)}` : <span style={{ color: 'var(--muted-text)' }}>free</span>}
              </span>
              <span className="text-sm font-mono">
                {info && info.output > 0 ? `$${info.output.toFixed(2)}` : <span style={{ color: 'var(--muted-text)' }}>free</span>}
              </span>
              <div className="flex flex-wrap gap-1">
                {info?.caps.map(c => <CapBadge key={c} cap={c} />)}
              </div>
            </div>
          ))
        )}
      </div>

      <p className="text-xs mt-4" style={{ color: 'var(--muted-text)' }}>
        Prices shown are market rates from model providers. ArkeAPI charges quota units — see your plan for the conversion rate.
      </p>
    </div>
  )
}
