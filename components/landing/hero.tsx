import Link from 'next/link'

const CODE_HTML = `<span style="color:rgba(255,255,255,0.32)"># Drop-in — change one line</span>
<span style="color:#c792ea">from</span> openai <span style="color:#c792ea">import</span> OpenAI

client = OpenAI(
    base_url=<span style="color:#ff9580">"https://api.arkeapi.com/v1"</span>,
    api_key=<span style="color:#c3e88d">"sk-arke-..."</span>,
)

response = client.chat.completions.create(
    model=<span style="color:#c3e88d">"gpt-4o"</span>,
    messages=[{
        <span style="color:#c3e88d">"role"</span>: <span style="color:#c3e88d">"user"</span>,
        <span style="color:#c3e88d">"content"</span>: <span style="color:#c3e88d">"Hello!"</span>,
    }],
)

<span style="color:#82aaff">print</span>(response.choices[0].message.content)
<span style="color:rgba(255,255,255,0.32)"># &gt; Hello! How can I help you today?</span>`

const STATS = [
  { value: '15+', label: 'Models' },
  { value: '<60ms', label: 'Avg Latency' },
  { value: '99.9%', label: 'Uptime' },
]

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#0A0A09', minHeight: '100vh' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 right-1/3 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,61,0,0.12) 0%, transparent 70%)',
        }}
      />

      <div
        className="relative max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]"
        style={{ minHeight: '100vh' }}
      >
        {/* Left: Content */}
        <div className="flex flex-col justify-center px-12 lg:px-20 py-24">
          <p
            className="text-xs font-mono uppercase mb-8"
            style={{ color: '#ff3d00', letterSpacing: '0.15em' }}
          >
            OpenAI-Compatible · 15+ Models · Singapore Edge
          </p>

          <h1
            className="font-bold leading-[0.92] mb-8 text-white"
            style={{
              fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
              letterSpacing: '-0.04em',
            }}
          >
            One key.<br />
            Every model.<br />
            <span style={{ color: '#ff3d00' }}>Zero limits.</span>
          </h1>

          <p
            className="text-lg mb-12 leading-relaxed max-w-lg"
            style={{ color: 'rgba(255,255,255,0.45)', lineHeight: '1.75' }}
          >
            Drop-in OpenAI replacement. Access GPT-4o, Claude 3.5, Gemini and more through one gateway. Token quota never expires.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-16">
            <Link
              href="#pricing"
              className="inline-flex items-center h-12 px-8 text-sm font-bold text-white rounded-full transition-opacity hover:opacity-88"
              style={{ backgroundColor: '#ff3d00', letterSpacing: '-0.005em' }}
            >
              Get API Key
            </Link>
            <a
              href="https://api.arkeapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center h-12 px-7 text-sm font-medium rounded-full border transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'transparent' }}
            >
              View Docs →
            </a>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-10 pt-8 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  className="text-3xl font-bold text-white"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {s.value}
                </p>
                <p
                  className="text-xs font-mono uppercase mt-1"
                  style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Terminal */}
        <div
          className="hidden lg:flex flex-col justify-center border-l"
          style={{
            backgroundColor: '#0D0D0C',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          {/* Terminal chrome */}
          <div
            className="px-6 py-4 border-b flex items-center justify-between"
            style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
            </div>
            <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
              quickstart.py
            </span>
            <span
              className="text-xs px-2.5 py-0.5 rounded font-mono"
              style={{ color: 'rgba(255,255,255,0.22)', backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              Python
            </span>
          </div>

          {/* Code body */}
          <pre
            className="px-10 py-10 text-sm leading-[1.9] overflow-x-auto flex-1"
            style={{
              fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", monospace',
              color: 'rgba(255,255,255,0.65)',
            }}
            dangerouslySetInnerHTML={{ __html: CODE_HTML }}
          />
        </div>
      </div>
    </section>
  )
}
