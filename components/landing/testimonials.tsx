const TESTIMONIALS = [
  {
    quote:
      'We were hitting rate limits and paying for three separate API keys. Switched to ArkeAPI in an afternoon — one env var change. Our infra cost dropped 40% and we haven\'t touched it since.',
    name: 'Jason K.',
    title: 'CTO',
    company: 'Buildfast',
  },
  {
    quote:
      'ArkeAPI\'s failover is the real deal. We had a Claude outage mid-demo and it silently rerouted to GPT-4o. The client never knew. That alone is worth every cent.',
    name: 'Mei L.',
    title: 'Lead Engineer',
    company: 'Synapse Labs',
  },
  {
    quote:
      'The latency from Southeast Asia on other providers was killing our UX. With ArkeAPI\'s Singapore edge, we cut our p95 from 3.2s to 780ms. Users noticed immediately.',
    name: 'Rahul S.',
    title: 'Founder',
    company: 'Promptly',
  },
  {
    quote:
      'Token quota that never expires was the killer feature for us. We\'re an education startup — usage is bursty by semester. No more losing unused quota at month end.',
    name: 'Sarah T.',
    title: 'Head of Product',
    company: 'LearnStack',
  },
]

// Duplicate for seamless loop
const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS]

export function Testimonials() {
  return (
    <section className="border-t overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      <div className="py-20">

        {/* Header — centered */}
        <div className="text-center mb-14 px-8">
          <p
            className="text-xs font-bold uppercase mb-5"
            style={{ color: '#ff3d00', letterSpacing: '0.12em' }}
          >
            Don&apos;t take our word for it.
          </p>
          <h2
            className="text-4xl md:text-5xl font-semibold mb-8"
            style={{ letterSpacing: '-0.03em' }}
          >
            Proof from the people shipping.
          </h2>
        </div>

        {/* Scrolling testimonial track */}
        <div className="relative">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--background), transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--background), transparent)' }}
          />

          <div className="flex">
            <div
              className="flex gap-5 shrink-0"
              style={{ animation: 'testimonial-scroll 40s linear infinite' }}
            >
              {ITEMS.map((t, i) => (
                <div
                  key={i}
                  className="shrink-0 flex flex-col justify-between p-8 rounded-2xl border"
                  style={{
                    width: '380px',
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {/* Quote mark */}
                  <div>
                    <div
                      className="text-5xl font-serif leading-none mb-5 select-none"
                      style={{ color: '#ff3d00', fontFamily: 'Georgia, serif', lineHeight: 1 }}
                      aria-hidden
                    >
                      &ldquo;
                    </div>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {t.quote}
                    </p>
                  </div>

                  {/* Attribution */}
                  <div className="mt-8 pt-6 border-t flex items-center justify-between"
                    style={{ borderColor: 'var(--border)' }}>
                    <div>
                      <p
                        className="text-xs font-bold uppercase"
                        style={{ color: 'var(--foreground)', letterSpacing: '0.07em' }}
                      >
                        {t.name}
                      </p>
                      <p
                        className="text-xs uppercase mt-0.5"
                        style={{ color: 'var(--muted-text)', letterSpacing: '0.06em' }}
                      >
                        {t.title}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes testimonial-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
