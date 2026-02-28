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
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden>

      {/* ── LIGHT MODE: warm bone metallic ── */}
      <div className="dark:hidden absolute inset-0">
        {/* Metallic scatter base */}
        <div style={{
          position: 'absolute', inset: 0,
          background: [
            'radial-gradient(ellipse 110% 65% at 30% 15%, rgba(255,255,255,0.22) 0%, transparent 60%)',
            'radial-gradient(ellipse 70% 55% at 78% 80%, rgba(195,190,178,0.09) 0%, transparent 55%)',
            'radial-gradient(circle at 50% 30%, #F8F7F2 0%, #F0EFE7 100%)',
          ].join(', '),
        }} />
        {/* 40×40 dim grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.012) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Spotlight grid near cursor */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle 320px at var(--mouse-x, 50%) var(--mouse-y, 30%), black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle 320px at var(--mouse-x, 50%) var(--mouse-y, 30%), black 0%, transparent 100%)',
        }} />
        {/* Warm cursor glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(255,255,255,0.10) 0%, transparent 100%)',
        }} />
      </div>

      {/* ── DARK MODE: deep titanium + orange spotlight ── */}
      <div className="hidden dark:block absolute inset-0">
        {/* Titanium base gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 30%, #1A1A1B 0%, #111112 100%)',
        }} />
        {/* 40×40 subtle white grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Orange-tinted spotlight grid near cursor */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,79,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,79,0,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle 320px at var(--mouse-x, 50%) var(--mouse-y, 30%), black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle 320px at var(--mouse-x, 50%) var(--mouse-y, 30%), black 0%, transparent 100%)',
        }} />
        {/* Faint orange cursor glow — scanning light */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle 220px at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(255,79,0,0.05) 0%, transparent 100%)',
        }} />
      </div>

    </div>
  )
}
