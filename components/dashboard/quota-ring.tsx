'use client'

interface QuotaRingProps {
  used: number
  total: number
  size?: number
  strokeWidth?: number
}

export function QuotaRing({ used, total, size = 140, strokeWidth = 10 }: QuotaRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const pct = total > 0 ? Math.min(used / total, 1) : 0
  const offset = circumference * (1 - pct)

  const usedPct = Math.round(pct * 100)

  function fmt(n: number) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
    if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K'
    return n.toString()
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="#FF4F00"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-bold" style={{ letterSpacing: '-0.03em' }}>{usedPct}%</p>
        <p className="text-xs" style={{ color: 'var(--muted-text)' }}>used</p>
      </div>
    </div>
  )
}

export function QuotaBar({ used, total }: { used: number; total: number }) {
  const pct = total > 0 ? Math.min((used / total) * 100, 100) : 0

  function fmt(n: number) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M'
    if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K'
    return n.toString()
  }

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--muted-text)' }}>
        <span>{fmt(used)} used</span>
        <span>{fmt(total)} total</span>
      </div>
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: '#FF4F00' }}
        />
      </div>
    </div>
  )
}
