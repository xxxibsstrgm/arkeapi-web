import Link from 'next/link'

const FEATURED = {
  tag: 'LAUNCH',
  date: 'February 14, 2026',
  title: 'ArkeAPI is live — the fastest OpenAI-compatible gateway for Asia-Pacific.',
  excerpt:
    'After months of private beta, ArkeAPI is now open to all developers. One API key. 15+ models. Sub-60ms average latency from Singapore.',
  href: '#',
}

const POSTS = [
  {
    tag: 'NEW MODEL',
    date: 'February 20, 2026',
    title: 'Claude 3.7 Sonnet added — extended thinking now supported',
    excerpt:
      "Anthropic's latest flagship is available via ArkeAPI. Claude 3.7 supports extended thinking mode for complex reasoning tasks.",
    href: '#',
  },
  {
    tag: 'UPDATE',
    date: 'February 10, 2026',
    title: 'DeepSeek V3 & R1 now in catalog at lowest market price',
    excerpt:
      'DeepSeek V3 and R1 are now available at $0.14/1M input tokens — the best price-to-performance ratio in our catalog.',
    href: '#',
  },
  {
    tag: 'INFRASTRUCTURE',
    date: 'January 28, 2026',
    title: 'Average latency drops to <60ms — Singapore edge upgrade complete',
    excerpt:
      'We completed a major infrastructure upgrade on our Singapore DigitalOcean cluster. Median response latency is now 58ms.',
    href: '#',
  },
]

export function Announcements() {
  return (
    <section className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1440px] mx-auto px-10 py-20">

        {/* Section header */}
        <div className="text-center mb-14">
          <p
            className="uppercase mb-4"
            style={{ fontSize: '12px', color: '#FF4F00', letterSpacing: '0.15em', textShadow: '0 0 10px rgba(255,79,0,0.25)' }}
          >
            Announcements
          </p>
          <h2
            className="mb-6"
            style={{ fontSize: '46px', letterSpacing: '-0.025em', lineHeight: 1.1, fontWeight: 400 }}
          >
            Latest updates &amp; news
          </h2>
          <Link
            href="#"
            className="text-sm font-medium transition-opacity hover:opacity-60 inline-flex items-center gap-1.5"
            style={{ color: 'var(--muted-text)' }}
          >
            View all <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Featured post */}
        <Link href={FEATURED.href} className="group block mb-5 rounded-2xl overflow-hidden relative"
          style={{
            backgroundColor: '#111110',
            border: '1px solid #2A2A28',
            minHeight: '340px',
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 80% 20%, rgba(255,61,0,0.18) 0%, transparent 65%)',
            }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-72 h-72 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 80%, rgba(255,61,0,0.07) 0%, transparent 60%)',
            }}
          />

          {/* Grid lines decoration */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative p-10 flex flex-col justify-between h-full" style={{ minHeight: '340px' }}>
            <div>
              <span
                className="inline-block text-xs font-bold uppercase px-2.5 py-1 rounded mb-6"
                style={{
                  backgroundColor: 'rgba(255,61,0,0.18)',
                  color: '#FF4F00',
                  letterSpacing: '0.08em',
                }}
              >
                {FEATURED.tag}
              </span>

              <h3
                className="text-3xl font-bold leading-tight mb-4 max-w-2xl group-hover:opacity-80 transition-opacity"
                style={{ color: '#F5F5F3', letterSpacing: '-0.02em' }}
              >
                {FEATURED.title}
              </h3>

              <p
                className="text-base leading-relaxed max-w-xl"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {FEATURED.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between mt-10">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {FEATURED.date}
              </span>
              <span
                className="text-sm font-medium flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                style={{ color: '#FF4F00' }}
              >
                Read more <span>→</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Smaller posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {POSTS.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="group flex flex-col justify-between p-7 rounded-xl border transition-colors hover:border-current"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <div>
                {/* Excerpt preview — muted, small */}
                <p
                  className="text-xs leading-relaxed mb-5 line-clamp-2"
                  style={{ color: 'var(--muted-text)' }}
                >
                  {post.excerpt}
                </p>

                <h4
                  className="text-base font-semibold leading-snug mb-3 group-hover:opacity-70 transition-opacity"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {post.title}
                </h4>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--muted-text)' }}>
                  <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" />
                  <path d="M1.5 6.5h13M5.5 1v3M10.5 1v3" />
                </svg>
                <span className="text-xs" style={{ color: 'var(--muted-text)' }}>
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
