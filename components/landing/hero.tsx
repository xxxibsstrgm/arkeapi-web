import Link from 'next/link'

const CODE_HTML = `<span style="color:rgba(255,255,255,0.35)"># Drop-in replacement — change one line</span>
<span style="color:#c792ea">from</span> openai <span style="color:#c792ea">import</span> OpenAI

client = OpenAI(
    base_url=<span style="color:#ff9580">"https://api.arkeapi.com/v1"</span>,
    api_key=<span style="color:#c3e88d">"sk-arke-..."</span>,
)

response = client.chat.completions.create(
    model=<span style="color:#c3e88d">"gpt-4o"</span>,
    messages=[
        {<span style="color:#c3e88d">"role"</span>: <span style="color:#c3e88d">"user"</span>, <span style="color:#c3e88d">"content"</span>: <span style="color:#c3e88d">"Hello!"</span>}
    ],
)

<span style="color:#82aaff">print</span>(response.choices[0].message.content)`

export function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

        {/* Left: Terminal window */}
        <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border"
          style={{
            backgroundColor: '#111110',
            borderColor: '#2A2A28',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.04)',
          }}>
          {/* Terminal chrome */}
          <div className="px-5 py-3 border-b flex items-center justify-between"
            style={{ borderColor: '#2A2A28', backgroundColor: '#18181600' }}>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
            </div>
            <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>
              quickstart.py
            </span>
            <span className="text-xs px-2 py-0.5 rounded font-mono"
              style={{ color: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
              Python
            </span>
          </div>
          {/* Code */}
          <pre
            className="px-6 py-6 text-[13px] leading-[1.85] overflow-x-auto"
            style={{ fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace', color: 'rgba(255,255,255,0.72)' }}
            dangerouslySetInnerHTML={{ __html: CODE_HTML }}
          />
        </div>

        {/* Right: Content */}
        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: 'var(--muted-text)', letterSpacing: '0.12em' }}>
            OpenAI-Compatible · 15+ Models · Singapore Edge
          </p>

          <h1 className="font-bold leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 3.75rem)', letterSpacing: '-0.035em' }}>
            One key.
            <br />
            Every model.
            <br />
            <span style={{ color: '#ff3d00' }}>Zero limits.</span>
          </h1>

          <p className="text-lg mb-10 leading-relaxed"
            style={{ color: 'var(--muted-text)', maxWidth: '26rem', lineHeight: '1.75' }}>
            Drop-in OpenAI replacement. Access GPT-4o, Claude 3.5, Gemini 1.5 and more through one gateway. Token quota never expires.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-12">
            <Link href="#pricing"
              className="inline-flex items-center h-11 px-7 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-88"
              style={{ backgroundColor: '#ff3d00', letterSpacing: '-0.01em' }}>
              Get API Key
            </Link>
            <a href="https://api.arkeapi.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center h-11 px-6 text-sm font-medium rounded-lg border transition-colors hover:opacity-70"
              style={{ color: 'var(--foreground)', borderColor: 'var(--border)' }}>
              View Docs →
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 pt-8 border-t"
            style={{ borderColor: 'var(--border)' }}>
            {[
              { label: 'Models', value: '15+' },
              { label: 'Avg Latency', value: '<80ms' },
              { label: 'Uptime', value: '99.9%' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold" style={{ letterSpacing: '-0.025em' }}>{stat.value}</p>
                <p className="text-xs mt-0.5 font-medium uppercase tracking-wider" style={{ color: 'var(--muted-text)', letterSpacing: '0.06em' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
