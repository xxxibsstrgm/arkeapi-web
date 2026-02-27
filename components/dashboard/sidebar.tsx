'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutGrid, Cpu, MessageSquare, BarChart2, LogOut, Zap } from 'lucide-react'
import { useDashboard } from '@/lib/dashboard-context'

const NAV = [
  { href: '/dashboard/overview', label: 'Overview',  icon: LayoutGrid },
  { href: '/dashboard/models',   label: 'Models',    icon: Cpu },
  { href: '/dashboard/chat',     label: 'Playground', icon: MessageSquare },
  { href: '/dashboard/usage',    label: 'Usage',     icon: BarChart2 },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { apiKey, logout } = useDashboard()

  const truncatedKey = apiKey
    ? apiKey.slice(0, 10) + '...' + apiKey.slice(-4)
    : null

  function handleLogout() {
    logout()
    router.push('/dashboard')
  }

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-60 flex flex-col z-40"
      style={{ backgroundColor: '#111110', borderRight: '1px solid #1E1E1C' }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: '#1E1E1C' }}>
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ backgroundColor: '#ff3d00' }}
          >
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.9)' }}>
            ArkeAPI
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                color: active ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.42)',
                backgroundColor: active ? 'rgba(255,255,255,0.08)' : 'transparent',
              }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t space-y-1" style={{ borderColor: '#1E1E1C' }}>
        {truncatedKey && (
          <div
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
            style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: '#22c55e' }}
            />
            <span
              className="text-xs font-mono truncate"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {truncatedKey}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/5"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
