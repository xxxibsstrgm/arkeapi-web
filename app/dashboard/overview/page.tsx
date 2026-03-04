'use client'

import Link from 'next/link'
import { Cpu, MessageSquare, BarChart2, RefreshCw } from 'lucide-react'
import { useDashboard } from '@/lib/dashboard-context'
import { AuthGuard } from '@/components/dashboard/auth-guard'
import { QuotaRing, QuotaBar } from '@/components/dashboard/quota-ring'

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K'
  return n.toString()
}

export default function OverviewPage() {
  return (
    <AuthGuard>
      <OverviewContent />
    </AuthGuard>
  )
}

function OverviewContent() {
  const { tokenInfo, refreshUsage } = useDashboard()

  if (!tokenInfo) return null

  const { name, total_granted, total_used, total_available } = tokenInfo

  const cards = [
    {
      href: '/dashboard/models',
      icon: Cpu,
      label: 'Models',
      desc: 'Browse available models and pricing',
    },
    {
      href: '/dashboard/chat',
      icon: MessageSquare,
      label: 'Playground',
      desc: 'Test any model interactively',
    },
    {
      href: '/dashboard/usage',
      icon: BarChart2,
      label: 'Usage',
      desc: 'Detailed quota breakdown',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="text-xs font-bold uppercase mb-1"
            style={{ color: '#FF4F00', letterSpacing: '0.12em', textShadow: '0 0 10px rgba(255,79,0,0.25)' }}>
            API Key
          </p>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-0.04em' }}>{name}</h1>
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

      {/* Quota card */}
      <div
        className="rounded-2xl p-8 mb-8 border"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-10">
          <QuotaRing used={total_used} total={total_granted} size={140} />
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-6 mb-6">
              {[
                { label: 'Total Granted', value: fmt(total_granted) },
                { label: 'Used',          value: fmt(total_used) },
                { label: 'Remaining',     value: fmt(total_available) },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--muted-text)', letterSpacing: '0.08em' }}>{s.label}</p>
                  <p className="text-2xl font-extrabold" style={{ letterSpacing: '-0.03em' }}>{s.value}</p>
                </div>
              ))}
            </div>
            <QuotaBar used={total_used} total={total_granted} />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t flex items-center gap-2 text-xs" style={{ borderColor: 'var(--border)', color: 'var(--muted-text)' }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }} />
          Quota never expires · OpenAI-compatible endpoint: <code className="font-mono ml-1">api.arkeapi.com/v1</code>
        </div>
      </div>

      {/* Quick access cards */}
      <div className="grid grid-cols-3 gap-4">
        {cards.map(({ href, icon: Icon, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl p-5 border transition-all hover:shadow-md"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: 'var(--surface-alt)' }}
            >
              <Icon className="w-4 h-4" style={{ color: '#ff3d00' }} />
            </div>
            <p className="text-sm font-semibold mb-1">{label}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-text)' }}>{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
