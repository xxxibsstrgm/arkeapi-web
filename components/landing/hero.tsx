import Link from 'next/link'

const CODE_HTML = `<span style="color:rgba(255,255,255,0.32)"># Drop-in — change one line</span>
<span style="color:#c792ea">from</span> openai <span style="color:#c792ea">import</span> OpenAI

client = OpenAI(
    base_url=<span style="color:#ff9580">"https://api.arkeapi.com/v1"</span>,
    api_key=<span style="color:#c3e88d">"sk-arke-..."</span>,
)

response = client.chat.completions.create(
    model=<span style="color:#c3e88d">"gpt-4o"</span>,
    messages=[
        {
            <span style="color:#c3e88d">"role"</span>: <span style="color:#c3e88d">"user"</span>,
            <span style="color:#c3e88d">"content"</span>: <span style="color:#c3e88d">"Hello!"</span>,
        }
    ],
)

<span style="color:#82aaff">print</span>(response.choices[0].message.content)
<span style="color:rgba(255,255,255,0.32)"># &gt; Hello! How can I help you today?</span>`

export function Hero() {
  return (
    <section
      className="min-h-[88vh] flex items-center border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-20 items-center">

          {/* Left: Terminal */}
          <div
            className="order-2 lg:order-1 rounded-xl overflow-hidden"
            style={{
              backgroundColor: '#111110',
              border: '1px solid #2A2A28',
              boxShadow: '0 32px 64px -16px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.03)',
              minHeight: '480px',
            }}
          >
            {/* Terminal chrome */}
            <div
              className="px-5 py-3.5 border-b flex items-center justify-between"
              style={{ borderColor: '#252523', backgroundColor: '#161614' }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
              </div>
              <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.22)' }}>
                quickstart.py
              </span>
              <span
                className="text-xs px-2.5 py-0.5 rounded font-mono"
                style={{ color: 'rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.06)' }}
              >
                Python
              </span>
            </div>

            {/* Code body */}
            <pre
              className="px-8 py-8 text-sm leading-[1.9] overflow-x-auto"
              style={{
                fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", monospace',
                color: 'rgba(255,255,255,0.7)',
                minHeight: '420px',
              }}
              dangerouslySetInnerHTML={{ __html: CODE_HTML }}
            />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <p
              className="text-xs font-bold uppercase mb-6"
              style={{ color: '#FF4500', letterSpacing: '0.12em' }}
            >
              OpenAI-Compatible · 15+ Models
            </p>

            <h1
              className="font-extrabold leading-[1.02] mb-7"
              style={{
                fontSize: 'clamp(2.6rem, 4.5vw, 3.6rem)',
                letterSpacing: '-0.04em',
                color: 'var(--foreground)',
              }}
            >
              One key.<br />
              Every model.<br />
              <span style={{ color: '#FF4500' }}>Zero limits.</span>
            </h1>

            <p
              className="text-lg mb-10 leading-relaxed"
              style={{ color: 'var(--muted-text)', maxWidth: '22rem', lineHeight: '1.8' }}
            >
              Drop-in OpenAI replacement. Access GPT-4o, Claude 3.5, Gemini and more through one gateway. Token quota never expires.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-14">
              <Link
                href="#pricing"
                className="inline-flex items-center h-12 px-8 text-sm font-bold text-white rounded-full transition-opacity hover:opacity-88"
                style={{ backgroundColor: '#FF4500', letterSpacing: '-0.005em' }}
              >
                Get API Key
              </Link>
              <a
                href="https://api.arkeapi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-12 px-7 text-sm font-medium rounded-full border transition-colors hover:opacity-70"
                style={{ color: 'var(--foreground)', borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
              >
                View Docs →
              </a>
            </div>

            {/* Stats */}
            <div
              className="flex flex-wrap gap-10 pt-8 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              {[
                { label: 'Models', value: '15+' },
                { label: 'Avg Latency', value: '<60ms' },
                { label: 'Uptime', value: '99.9%' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-extrabold" style={{ letterSpacing: '-0.03em' }}>
                    {stat.value}
                  </p>
                  <p
                    className="text-xs font-semibold uppercase mt-1"
                    style={{ color: 'var(--muted-text)', letterSpacing: '0.08em' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
