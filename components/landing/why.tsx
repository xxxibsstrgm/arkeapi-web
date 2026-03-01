const WHY_ITEMS = [
  {
    title: 'True OpenAI Compatibility',
    description: 'Change one environment variable. Works with any OpenAI SDK — Python, Node.js, LangChain, LlamaIndex, and more. No code refactor needed.',
    code: 'OPENAI_BASE_URL=https://api.arkeapi.com/v1',
    large: true,
  },
  {
    title: '15+ Models, One Key',
    description: 'GPT-4o, Claude 3.5, Gemini 1.5 Pro, DeepSeek, and more through a single API key.',
    code: '"model": "claude-3-5-sonnet-20241022"',
    large: false,
  },
  {
    title: 'Quota Never Expires',
    description: 'Purchased token quota has no expiry. Use it at your own pace — a week or a year.',
    code: 'quota_expires: never',
    large: false,
  },
  {
    title: 'Low-Latency Edge',
    description: 'Global edge routing with sub-60ms median latency. Fast responses wherever you are.',
    code: 'latency: <60ms p50',
    large: false,
  },
  {
    title: 'Automatic Failover',
    description: 'Multiple upstream channels per model. Provider degraded? Requests silently reroute to the next available channel.',
    code: 'failover: automatic',
    large: true,
  },
  {
    title: 'Real-time Usage Tracking',
    description: 'Monitor token consumption per model. Understand costs before they surprise you.',
    code: 'dashboard: arkeapi.com/dashboard',
    large: false,
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
            One platform. Every model.<br />Any workflow.
          </h2>
        </div>

        {/* Bento grid — 4 columns, alternating large cards */}
        <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            backgroundColor: 'var(--border)',
          }}
        >
          {/* Row 1: Large (span 2) + 2 normal */}
          {/* Item 1 — large */}
          <div
            className="metal-card flex flex-col p-10 cursor-default"
            style={{
              gridColumn: 'span 2',
              backgroundColor: 'var(--surface)',
            }}
          >
            <p
              className="text-xs font-bold uppercase mb-4"
              style={{ color: '#FF4F00', letterSpacing: '0.1em' }}
            >
              01
            </p>
            <h3
              className="mb-3"
              style={{ fontSize: '1.35rem', fontWeight: 500, letterSpacing: '-0.025em' }}
            >
              {WHY_ITEMS[0].title}
            </h3>
            <p className="text-sm leading-relaxed mb-8 flex-1" style={{ color: 'var(--muted-text)' }}>
              {WHY_ITEMS[0].description}
            </p>
            {/* Featured code display */}
            <div
              className="rounded-lg p-4 font-mono text-sm"
              style={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
              }}
            >
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', marginBottom: '6px' }}># .env</p>
              <p style={{ color: '#FF4F00', textShadow: '0 0 10px rgba(255,79,0,0.2)' }}>
                {WHY_ITEMS[0].code}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>OPENAI_API_KEY=sk-arke-...</p>
            </div>
          </div>

          {/* Item 2 */}
          <div
            className="metal-card flex flex-col p-8 cursor-default"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <p className="text-xs font-bold uppercase mb-4" style={{ color: '#FF4F00', letterSpacing: '0.1em' }}>02</p>
            <h3 className="mb-2" style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>
              {WHY_ITEMS[1].title}
            </h3>
            <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--muted-text)' }}>
              {WHY_ITEMS[1].description}
            </p>
            <code
              className="text-xs font-mono px-2 py-1.5 rounded block truncate border"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: '#FF4F00', textShadow: '0 0 8px rgba(255,79,0,0.18)' }}
            >
              {WHY_ITEMS[1].code}
            </code>
          </div>

          {/* Item 3 */}
          <div
            className="metal-card flex flex-col p-8 cursor-default"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <p className="text-xs font-bold uppercase mb-4" style={{ color: '#FF4F00', letterSpacing: '0.1em' }}>03</p>
            <h3 className="mb-2" style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>
              {WHY_ITEMS[2].title}
            </h3>
            <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--muted-text)' }}>
              {WHY_ITEMS[2].description}
            </p>
            <code
              className="text-xs font-mono px-2 py-1.5 rounded block truncate border"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: '#FF4F00', textShadow: '0 0 8px rgba(255,79,0,0.18)' }}
            >
              {WHY_ITEMS[2].code}
            </code>
          </div>

          {/* Row 2: 1 normal + Large (span 2) + 1 normal */}
          {/* Item 4 */}
          <div
            className="metal-card flex flex-col p-8 cursor-default"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <p className="text-xs font-bold uppercase mb-4" style={{ color: '#FF4F00', letterSpacing: '0.1em' }}>04</p>
            <h3 className="mb-2" style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>
              {WHY_ITEMS[3].title}
            </h3>
            <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--muted-text)' }}>
              {WHY_ITEMS[3].description}
            </p>
            <code
              className="text-xs font-mono px-2 py-1.5 rounded block truncate border"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: '#FF4F00', textShadow: '0 0 8px rgba(255,79,0,0.18)' }}
            >
              {WHY_ITEMS[3].code}
            </code>
          </div>

          {/* Item 5 — large */}
          <div
            className="metal-card flex flex-col p-10 cursor-default"
            style={{
              gridColumn: 'span 2',
              backgroundColor: 'var(--surface)',
            }}
          >
            <p className="text-xs font-bold uppercase mb-4" style={{ color: '#FF4F00', letterSpacing: '0.1em' }}>05</p>
            <h3
              className="mb-3"
              style={{ fontSize: '1.35rem', fontWeight: 500, letterSpacing: '-0.025em' }}
            >
              {WHY_ITEMS[4].title}
            </h3>
            <p className="text-sm leading-relaxed mb-8 flex-1" style={{ color: 'var(--muted-text)' }}>
              {WHY_ITEMS[4].description}
            </p>
            {/* Featured status display */}
            <div
              className="rounded-lg p-4 font-mono text-sm flex items-center gap-3"
              style={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: '#FF4F00', boxShadow: '0 0 8px rgba(255,79,0,0.6)' }}
              />
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px' }}>provider status:</span>
              <span style={{ color: '#FF4F00', textShadow: '0 0 8px rgba(255,79,0,0.2)' }}>failover: automatic</span>
            </div>
          </div>

          {/* Item 6 */}
          <div
            className="metal-card flex flex-col p-8 cursor-default"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <p className="text-xs font-bold uppercase mb-4" style={{ color: '#FF4F00', letterSpacing: '0.1em' }}>06</p>
            <h3 className="mb-2" style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>
              {WHY_ITEMS[5].title}
            </h3>
            <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--muted-text)' }}>
              {WHY_ITEMS[5].description}
            </p>
            <code
              className="text-xs font-mono px-2 py-1.5 rounded block truncate border"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: '#FF4F00', textShadow: '0 0 8px rgba(255,79,0,0.18)' }}
            >
              {WHY_ITEMS[5].code}
            </code>
          </div>
        </div>
      </div>
    </section>
  )
}
