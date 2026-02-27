'use client'

import { useDashboard } from '@/lib/dashboard-context'
import { AuthGuard } from '@/components/dashboard/auth-guard'
import { QuotaRing, QuotaBar } from '@/components/dashboard/quota-ring'
import { RefreshCw, Key, Infinity, Clock } from 'lucide-react'

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(3) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toString()
}

export default function UsagePage() {
  return (
    <AuthGuard>
      <UsageContent />
    </AuthGuard>
  )
}

function UsageContent() {
  const { tokenInfo, refreshUsage } = useDashboard()
  if (!tokenInfo) return null

  const { name, total_granted, total_used, total_available, unlimited_quota, expires_at } = tokenInfo
  const pct = total_granted > 0 ? ((total_used / total_granted) * 100).toFixed(1) : '0'

  const details = [
    { icon: Key,      label: 'Key Name',     value: name },
    { icon: Clock,    label: 'Expires',       value: expires_at === 0 ? 'Never' : new Date(expires_at * 1000).toLocaleDateString() },
    { icon: Infinity, label: 'Quota Type',    value: unlimited_quota ? 'Unlimited' : 'Fixed quota' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-8 py-12">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-text)', letterSpacing: '0.1em' }}>
            Usage & Quota
          </p>
          <h1 className="text-2xl font-bold" style={{ letterSpacing: '-0.025em' }}>{name}</h1>
        </div>
        <button
          onClick={refreshUsage}
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border transition-colors hover:opacity-70"
          style={{ color: 'var(--muted-text)', borderColor: 'var(--border)' }}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Quota ring — large */}
      <div
        className="rounded-2xl p-10 border mb-6 flex flex-col items-center"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <QuotaRing used={total_used} total={total_granted} size={200} strokeWidth={14} />
        <p className="text-sm mt-6 mb-6" style={{ color: 'var(--muted-text)' }}>
          {pct}% of quota consumed
        </p>
        <div className="w-full max-w-sm">
          <QuotaBar used={total_used} total={total_granted} />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Granted', value: fmt(total_granted), color: 'var(--foreground)' },
          { label: 'Used',          value: fmt(total_used),    color: '#ff3d00' },
          { label: 'Remaining',     value: fmt(total_available), color: '#22c55e' },
        ].map(s => (
          <div
            key={s.label}
            className="rounded-xl p-5 border"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--muted-text)', letterSpacing: '0.06em' }}>{s.label}</p>
            <p className="text-xl font-bold" style={{ color: s.color, letterSpacing: '-0.02em' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Key details */}
      <div
        className="rounded-xl border divide-y"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', '--tw-divide-opacity': 1 } as React.CSSProperties}
      >
        {details.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 px-5 py-4" style={{ borderColor: 'var(--border)' }}>
            <Icon className="w-4 h-4 shrink-0" style={{ color: 'var(--muted-text)' }} />
            <span className="text-sm" style={{ color: 'var(--muted-text)', minWidth: '100px' }}>{label}</span>
            <span className="text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
