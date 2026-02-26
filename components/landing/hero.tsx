import Link from 'next/link'

export function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
      {/* Eyebrow */}
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-6"
        style={{ color: '#6B6B6B', letterSpacing: '0.1em' }}
      >
        OpenAI-Compatible · Singapore · Low Latency
      </p>

      {/* Headline */}
      <h1
        className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6"
        style={{ letterSpacing: '-0.03em' }}
      >
        Global High-Speed
        <br />
        <span style={{ color: '#F4793E' }}>AI Gateway.</span>
      </h1>

      {/* Sub-headline */}
      <p
        className="text-xl md:text-2xl max-w-xl mb-12 leading-relaxed"
        style={{ color: '#6B6B6B' }}
      >
        One API key to access GPT-4o, Claude, Gemini and more.
        Drop-in replacement for OpenAI. No rate limits on purchased quota.
      </p>

      {/* CTAs */}
      <div className="flex items-center gap-4">
        <Link
          href="#pricing"
          className="inline-flex items-center h-12 px-8 text-base text-white rounded font-medium transition-colors"
          style={{ backgroundColor: '#F4793E' }}
        >
          Get API Key
        </Link>
        <a
          href="https://api.arkeapi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center h-12 px-6 text-base rounded font-medium transition-colors"
          style={{ color: '#6B6B6B' }}
        >
          View Docs →
        </a>
      </div>

      {/* Stats bar */}
      <div
        className="mt-16 pt-8 border-t flex flex-wrap gap-12"
        style={{ borderColor: '#D4D3CC' }}
      >
        {[
          { label: 'Models', value: '15+' },
          { label: 'Avg Latency', value: '<80ms' },
          { label: 'Uptime', value: '99.9%' },
          { label: 'Base URL', value: 'api.arkeapi.com/v1' },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
            <p className="text-sm mt-1" style={{ color: '#6B6B6B' }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
