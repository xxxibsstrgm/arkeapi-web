import Link from 'next/link'

const CASES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
    tag: 'PERSONAL USE',
    title: 'Chat with any AI, instantly',
    description:
      'Open our built-in chat in your browser. No setup, no code. Switch between GPT-4o, Claude, Gemini and 15+ models with one click.',
    cta: 'Open Chat →',
    href: '/dashboard/chat',
    code: 'arkeapi.com/dashboard/chat',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    tag: 'APPS & CLIENTS',
    title: 'Connect your favourite AI app',
    description:
      'Use your ArkeAPI key with OpenClaw, ChatBox, LobeChat, or any app that supports a custom API endpoint. Paste and go.',
    cta: 'See how →',
    href: '/docs/quickstart',
    code: 'Base URL: api.arkeapi.com/v1',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    tag: 'DEVELOPERS',
    title: 'Drop-in API replacement',
    description:
      'One env var change. Works with the OpenAI SDK, LangChain, LlamaIndex, and more. Build once, swap models freely.',
    cta: 'View Docs →',
    href: '/docs',
    code: 'OPENAI_BASE_URL=https://api.arkeapi.com/v1',
  },
]

export function UseCases() {
  return (
    <section className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1440px] mx-auto px-10 py-20">

        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="uppercase mb-4"
            style={{ fontSize: '12px', color: '#FF4F00', letterSpacing: '0.15em', textShadow: '0 0 10px rgba(255,79,0,0.25)' }}
          >
            Get started in minutes
          </p>
          <h2
            style={{ fontSize: '46px', letterSpacing: '-0.025em', lineHeight: 1.1, fontWeight: 400 }}
          >
            However you use AI, we&apos;ve got you.
          </h2>
        </div>

        {/* Three-column cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASES.map((c) => (
            <div
              key={c.tag}
              className="metal-card flex flex-col rounded-lg border p-8"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-6 shrink-0"
                style={{ backgroundColor: 'rgba(255,79,0,0.1)', color: '#FF4F00' }}
              >
                {c.icon}
              </div>

              {/* Tag */}
              <p
                className="text-xs font-bold uppercase mb-2"
                style={{ color: '#FF4F00', letterSpacing: '0.1em' }}
              >
                {c.tag}
              </p>

              {/* Title */}
              <h3 className="text-lg mb-3" style={{ fontWeight: 500, letterSpacing: '-0.02em' }}>
                {c.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--muted-text)' }}>
                {c.description}
              </p>

              {/* Code badge */}
              <code
                className="text-xs font-mono px-2 py-1.5 rounded block truncate border mb-6"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: '#FF4F00',
                  textShadow: '0 0 8px rgba(255,79,0,0.2)',
                }}
              >
                {c.code}
              </code>

              {/* CTA */}
              <Link
                href={c.href}
                className="text-sm font-semibold transition-opacity hover:opacity-70"
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
