'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DOC_NAV } from '@/lib/docs-content'

export function DocsNav() {
  const pathname = usePathname()

  return (
    <nav className="px-3 py-4">
      <p
        className="px-3 mb-3 text-xs font-bold uppercase"
        style={{ color: 'var(--muted-text)', letterSpacing: '0.12em' }}
      >
        Documentation
      </p>
      <ul className="space-y-0.5">
        {DOC_NAV.map(({ slug, title }) => {
          const active = pathname === `/docs/${slug}`
          return (
            <li key={slug}>
              <Link
                href={`/docs/${slug}`}
                className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: active ? 'var(--foreground)' : 'var(--muted-text)',
                  backgroundColor: active ? 'var(--surface-alt)' : 'transparent',
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
