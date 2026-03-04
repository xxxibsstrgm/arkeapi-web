'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutGrid, Cpu, MessageSquare, BarChart2, LogOut } from 'lucide-react'
import { useDashboard } from '@/lib/dashboard-context'

const NAV = [
  { href: '/dashboard/overview', label: 'Overview',   icon: LayoutGrid },
  { href: '/dashboard/models',   label: 'Models',     icon: Cpu },
  { href: '/dashboard/chat',     label: 'Playground', icon: MessageSquare },
  { href: '/dashboard/usage',    label: 'Usage',      icon: BarChart2 },
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
      className="fixed top-0 left-0 h-screen w-60 flex flex-col z-40 border-r"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Logo */}
      <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <Link href="/" className="logo-link shrink-0">
          <Image
            src="/logo.png"
            alt="Arke"
            width={88}
            height={46}
            className="logo-img"
            priority
          />
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
                color: active ? 'var(--foreground)' : 'var(--muted-text)',
                backgroundColor: active ? 'var(--surface-alt)' : 'transparent',
              }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t space-y-1" style={{ borderColor: 'var(--border)' }}>
        {truncatedKey && (
          <div
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: '#22c55e' }}
            />
            <span
              className="text-xs font-mono truncate"
              style={{ color: 'var(--muted-text)' }}
            >
              {truncatedKey}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{ color: 'var(--muted-text)' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
