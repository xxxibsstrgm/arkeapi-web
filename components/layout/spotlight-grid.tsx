'use client'
import { useEffect } from 'react'

export function SpotlightGrid() {
  useEffect(() => {
    const root = document.documentElement
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
      {/* Layer 1: metallic base — warm bone with simulated light scatter */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: [
            'radial-gradient(ellipse 110% 65% at 30% 15%, rgba(255,255,255,0.22) 0%, transparent 60%)',
            'radial-gradient(ellipse 70% 55% at 78% 80%, rgba(195,190,178,0.09) 0%, transparent 55%)',
            'linear-gradient(148deg, rgba(255,255,255,0.05) 0%, transparent 38%, rgba(0,0,0,0.012) 100%)',
            'radial-gradient(circle at 50% 30%, #F8F7F2 0%, #F0EFE7 100%)',
          ].join(', '),
        }}
      />

      {/* Layer 2: 20×20 precision grid — barely visible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.008) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.008) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Layer 3: spotlight grid — 3% opacity reveal near cursor */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.032) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.032) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage:
            'radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 30%), black 0%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 30%), black 0%, transparent 100%)',
        }}
      />

      {/* Layer 4: polished metal reflection — subtle warm highlight at cursor */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(255,255,255,0.09) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
