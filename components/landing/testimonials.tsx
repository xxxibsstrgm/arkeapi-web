const TESTIMONIALS = [
  {
    quote:
      "We were hitting rate limits and paying for three separate API keys. Switched to ArkeAPI in an afternoon — one env var change. Our infra cost dropped 40% and we haven't touched it since.",
    name: 'JASON K.',
    title: 'CTO, BUILDFAST',
  },
  {
    quote:
      "ArkeAPI's failover is the real deal. We had a Claude outage mid-demo and it silently rerouted to GPT-4o. The client never knew. That alone is worth every cent.",
    name: 'MEI L.',
    title: 'LEAD ENGINEER, SYNAPSE LABS',
  },
  {
    quote:
      "The latency from Southeast Asia on other providers was killing our UX. With ArkeAPI's Singapore edge, we cut p95 from 3.2s to 780ms. Users noticed immediately.",
    name: 'RAHUL S.',
    title: 'FOUNDER, PROMPTLY',
  },
  {
    quote:
      "Token quota that never expires was the killer feature for us. We're an education startup — usage is bursty by semester. No more losing unused quota at month end.",
    name: 'SARAH T.',
    title: 'HEAD OF PRODUCT, LEARNSTACK',
  },
  {
    quote:
      "Migrated from direct OpenAI in 10 minutes. The OpenAI SDK just works — no wrapper, no adapter, nothing. Now we swap between Claude and GPT-4o with a single string change.",
    name: 'DAVID C.',
    title: 'SENIOR ENGINEER, PIPEFLOW',
  },
]

// Duplicate for seamless loop
const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS]

export function Testimonials() {
  return (
    <section
      className="border-t overflow-hidden"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
    >
      <div className="py-20">

        {/* Header — centered */}
        <div className="text-center mb-14 px-10">
          <p
            className="uppercase mb-4"
            style={{ fontSize: '12px', color: '#FF4500', letterSpacing: '0.15em', textShadow: '0 0 10px rgba(255,69,0,0.25)' }}
          >
            Don&apos;t take our word for it.
          </p>
          <h2
            style={{ fontSize: '46px', letterSpacing: '-0.025em', lineHeight: 1.1, fontWeight: 400 }}
          >
            Proof from the people shipping.
          </h2>
        </div>

        {/* Scrolling track */}
        <div className="relative">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--background), transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--background), transparent)' }}
          />

          <div className="flex">
            <div
              className="flex gap-4 shrink-0 pl-4"
              style={{ animation: 'testimonial-scroll 48s linear infinite' }}
            >
              {ITEMS.map((t, i) => (
                <div
                  key={i}
                  className="shrink-0 flex flex-col justify-between rounded-sm border"
                  style={{
                    width: '480px',
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    paddingTop: '2.5rem',
                    paddingBottom: '1.5rem',
                    paddingLeft: '2.5rem',
                    paddingRight: '2.5rem',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75), inset 0 -1px 0 rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Quote icon */}
                  <div>
                    <div
                      className="quote-mark text-4xl leading-none mb-4 select-none"
                      style={{ fontFamily: 'Georgia, serif', lineHeight: 1 }}
                      aria-hidden
                    >
                      &ldquo;
                    </div>

                    <p
                      className="leading-snug"
                      style={{
                        fontSize: '0.9375rem',
                        color: '#2A2A28',
                        fontFamily: 'var(--font-space-grotesk, sans-serif)',
                      }}
                    >
                      {t.quote}
                    </p>
                  </div>

                  {/* Attribution */}
                  <div className="mt-8">
                    <p
                      style={{
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        fontSize: '0.6875rem',
                        color: '#1A1A18',
                        letterSpacing: '0.04em',
                        lineHeight: 1.4,
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        fontSize: '0.6875rem',
                        color: 'rgba(0,0,0,0.4)',
                        letterSpacing: '0.04em',
                        marginTop: '0.2rem',
                      }}
                    >
                      {t.title}
                    </p>
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
