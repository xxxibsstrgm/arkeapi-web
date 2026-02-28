'use client'
import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        // Pick the topmost intersecting heading
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-72px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="On this page">
      {/* Header */}
      <div
        className="flex items-center gap-2 mb-4"
        style={{ color: 'var(--foreground)' }}
      >
        {/* Hamburger icon */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="0" y="2" width="14" height="1.5" fill="currentColor" rx="0.75" />
          <rect x="0" y="6.25" width="14" height="1.5" fill="currentColor" rx="0.75" />
          <rect x="0" y="10.5" width="14" height="1.5" fill="currentColor" rx="0.75" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ letterSpacing: '0.1em' }}>
          On this page
        </span>
      </div>

      <ul className="space-y-0">
        {headings.map(h => {
          const isActive = h.id === activeId
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className="block py-1.5 text-xs leading-snug transition-colors"
                style={{
                  paddingLeft: h.level === 3 ? '1.5rem' : '0.75rem',
                  color: isActive ? 'var(--foreground)' : 'var(--muted-text)',
                  borderLeft: isActive ? '2px solid #FF4500' : '2px solid transparent',
                }}
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  setActiveId(h.id)
                }}
              >
                {h.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
