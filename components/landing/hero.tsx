import Link from 'next/link'

export function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
      <p className="text-xs font-semibold uppercase tracking-widest mb-6"
        style={{ color: 'var(--muted-text)', letterSpacing: '0.1em' }}>
        OpenAI-Compatible · Singapore · 15+ Models
      </p>

      <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6"
        style={{ letterSpacing: '-0.03em' }}>
        Global High-Speed
        <br />
        <span style={{ color: '#ff3d00' }}>AI Gateway.</span>
      </h1>

      <p className="text-xl md:text-2xl max-w-xl mb-12 leading-relaxed"
        style={{ color: 'var(--muted-text)' }}>
        One API key to access GPT-4o, Claude, Gemini and more.
        Drop-in replacement for OpenAI. No rate limits on purchased quota.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <Link href="#pricing"
          className="inline-flex items-center h-12 px-8 text-base text-white rounded font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#ff3d00' }}>
          Get API Key
        </Link>
        <a href="https://api.arkeapi.com" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center h-12 px-6 text-base rounded font-medium transition-colors"
          style={{ color: 'var(--muted-text)' }}>
          View Docs →
        </a>
        <a href="https://api.arkeapi.com" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center h-12 px-6 text-base rounded font-medium border transition-colors"
          style={{ color: 'var(--foreground)', borderColor: 'var(--border)' }}>
          Dashboard
        </a>
      </div>

      {/* Stats bar */}
      <div className="mt-16 pt-8 border-t flex flex-wrap gap-10 md:gap-16"
        style={{ borderColor: 'var(--border)' }}>
        {[
          { label: 'Models', value: '15+' },
          { label: 'Avg Latency', value: '<80ms' },
          { label: 'Uptime', value: '99.9%' },
          { label: 'Base URL', value: 'api.arkeapi.com/v1' },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted-text)' }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
