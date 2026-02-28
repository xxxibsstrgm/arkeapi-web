const WHY_ITEMS = [
  {
    title: 'True OpenAI Compatibility',
    description:
      'Change one environment variable. Works with any OpenAI SDK — Python, Node.js, LangChain, LlamaIndex, and more.',
    code: 'OPENAI_BASE_URL=https://api.arkeapi.com/v1',
  },
  {
    title: '15+ Models, One Key',
    description:
      'Access GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, DeepSeek, and more through a single API key.',
    code: '"model": "claude-3-5-sonnet-20241022"',
  },
  {
    title: 'Quota Never Expires',
    description:
      'Your purchased token quota has no expiry date. Use it at your own pace — whether that takes a week or a year.',
    code: 'quota_expires: never',
  },
  {
    title: 'Singapore Edge Server',
    description:
      'Hosted on DigitalOcean Singapore. Optimized for developers across Asia-Pacific with low-latency routing.',
    code: 'region: ap-southeast-1',
  },
  {
    title: 'Automatic Failover',
    description:
      'Multiple upstream channels per model. If one provider is degraded, requests automatically route to the next available channel.',
    code: 'failover: automatic',
  },
  {
    title: 'Real-time Usage Tracking',
    description:
      'Monitor token consumption per model in your dashboard. Understand costs before they surprise you.',
    code: 'dashboard: api.arkeapi.com',
  },
]

export function Why() {
  return (
    <section className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <div className="px-10 py-12 border-b" style={{ borderColor: 'var(--border)' }}>
          <p
            className="text-xs font-mono uppercase mb-3"
            style={{ color: 'var(--muted-text)', letterSpacing: '0.1em' }}
          >
            Why ArkeAPI
          </p>
          <h2 className="text-4xl font-bold" style={{ letterSpacing: '-0.03em' }}>
            Built for developers who ship fast.
          </h2>
        </div>

        {/* 3-col seamless grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {WHY_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="p-10 border-r border-b transition-colors cursor-default hover:bg-[var(--surface)]"
              style={{
                borderColor: 'var(--border)',
                borderRightColor: (i + 1) % 3 === 0 ? 'transparent' : 'var(--border)',
              }}
            >
              <h3 className="text-base font-bold mb-3" style={{ letterSpacing: '-0.01em' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-text)' }}>
                {item.description}
              </p>
              <code
                className="text-xs font-mono px-3 py-1.5 rounded-sm block truncate border"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--muted-text)',
                }}
              >
                {item.code}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
