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
    title: 'Low-Latency Edge Network',
    description:
      'Global edge routing with sub-60ms median latency. Fast responses wherever you are.',
    code: 'latency: <60ms p50',
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
    code: 'dashboard: arkeapi.com/dashboard',
  },
]

export function Why() {
  return (
    <section className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1440px] mx-auto px-10 py-20">

        {/* Section header */}
        <div className="text-center mb-14">
          <p
            className="uppercase mb-4"
            style={{ fontSize: '12px', color: '#FF4F00', letterSpacing: '0.15em', textShadow: '0 0 10px rgba(255,79,0,0.25)' }}
          >
            Why ArkeAPI
          </p>
          <h2
            style={{ fontSize: '46px', letterSpacing: '-0.025em', lineHeight: 1.1, fontWeight: 400 }}
          >
            One platform. Every model. Any workflow.
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_ITEMS.map((item) => (
            <div
              key={item.title}
              className="metal-card p-6 rounded-lg border cursor-default"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <h3 className="text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-text)' }}>
                {item.description}
              </p>
              <code
                className="text-xs font-mono px-2 py-1 rounded block truncate border"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: '#FF4F00',
                  textShadow: '0 0 8px rgba(255,79,0,0.2)',
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
