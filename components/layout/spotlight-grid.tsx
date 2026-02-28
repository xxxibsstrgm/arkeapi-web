'use client'
import { useEffect } from 'react'

export function SpotlightGrid() {
  useEffect(() => {
    // Only apply on light mode (not dark)
    const root = document.documentElement

    // Default position: upper-center
    root.style.setProperty('--mouse-x', '50%')
    root.style.setProperty('--mouse-y', '30%')

    const handle = (e: MouseEvent) => {
      root.style.setProperty('--mouse-x', `${e.clientX}px`)
      root.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none dark:hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {/* Base background with radial gradient depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 30%, #F8F7F2 0%, #F2F1E9 100%)',
        }}
      />

      {/* Always-visible dim grid — very faint */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Spotlight grid — slightly brighter near cursor */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 30%), black 0%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 30%), black 0%, transparent 100%)',
        }}
      />

      {/* Subtle white glow at cursor */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(255,255,255,0.12) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
