import Link from 'next/link'

const CASES = [
  {
    num: '01',
    tag: 'PERSONAL USE',
    title: 'Chat with any AI, instantly',
    description:
      'Open our built-in chat in your browser. No setup, no code. Switch between GPT-4o, Claude, Gemini and 15+ models with one click.',
    cta: 'Open Chat →',
    href: '/dashboard/chat',
  },
  {
    num: '02',
    tag: 'APPS & CLIENTS',
    title: 'Connect your favourite AI app',
    description:
      'Use your ArkeAPI key with ChatBox, LobeChat, or any app that supports a custom API endpoint. Paste the base URL and go.',
    cta: 'See how →',
    href: '/docs/quickstart',
  },
  {
    num: '03',
    tag: 'DEVELOPERS',
    title: 'Drop-in API replacement',
    description:
      'One env var change. Works with the OpenAI SDK, LangChain, LlamaIndex, and more. Build once, swap models freely.',
    cta: 'View Docs →',
    href: '/docs',
  },
]

export function UseCases() {
  return (
    <section className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1440px] mx-auto px-10 py-20">

        {/* Header */}
        <div className="mb-14">
          <p
            className="uppercase mb-4"
            style={{ fontSize: '12px', color: '#FF4F00', letterSpacing: '0.15em', textShadow: '0 0 10px rgba(255,79,0,0.25)' }}
          >
            Get started in minutes
          </p>
          <h2
            style={{ fontSize: '46px', letterSpacing: '-0.025em', lineHeight: 1.1, fontWeight: 400 }}
          >
            However you use AI,<br />we&apos;ve got you.
          </h2>
        </div>

        {/* Numbered rows */}
        <div>
          {CASES.map((c, i) => (
            <div
              key={c.num}
              className="grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-6 md:gap-12 items-center py-8"
              style={{
                borderTop: i === 0 ? '1px solid var(--border)' : undefined,
                borderBottom: '1px solid var(--border)',
              }}
            >
              {/* Number */}
              <span
                className="font-mono select-none"
                style={{ fontSize: '13px', color: '#FF4F00', letterSpacing: '0.1em', opacity: 0.7 }}
              >
                {c.num}
              </span>

              {/* Content */}
              <div>
                <p
                  className="text-xs font-bold uppercase mb-1.5"
                  style={{ color: 'var(--muted-text)', letterSpacing: '0.1em' }}
                >
                  {c.tag}
                </p>
                <h3
                  className="mb-2"
                  style={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--foreground)' }}
                >
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)', maxWidth: '52ch' }}>
                  {c.description}
                </p>
              </div>

              {/* CTA */}
              <Link
                href={c.href}
                className="shrink-0 text-sm font-semibold transition-opacity hover:opacity-60 whitespace-nowrap"
                style={{ color: 'var(--foreground)' }}
              >
                {c.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
