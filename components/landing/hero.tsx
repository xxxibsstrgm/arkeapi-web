'use client'
import Link from 'next/link'
import { useState } from 'react'

const PYTHON_CODE = `<span style="color:rgba(255,255,255,0.28)"># Drop-in replacement — change one line</span>
<span style="color:#c792ea">from</span> openai <span style="color:#c792ea">import</span> OpenAI

client = OpenAI(
    base_url=<span style="color:#c3e88d">"https://api.arkeapi.com/v1"</span>,
    api_key=<span style="color:#c3e88d">"sk-arke-..."</span>,
)

response = client.chat.completions.create(
    model=<span style="color:#c3e88d">"gpt-4o"</span>,
    messages=[{
        <span style="color:#c3e88d">"role"</span>: <span style="color:#c3e88d">"user"</span>,
        <span style="color:#c3e88d">"content"</span>: <span style="color:#c3e88d">"Hello!"</span>,
    }],
)

<span style="color:#82aaff">print</span>(response.choices[<span style="color:#f78c6c">0</span>].message.content)
<span style="color:rgba(255,255,255,0.28)"># &gt; Hello! How can I help you today?</span>`

const JS_CODE = `<span style="color:rgba(255,255,255,0.28)">// Drop-in replacement — change one line</span>
<span style="color:#c792ea">import</span> OpenAI <span style="color:#c792ea">from</span> <span style="color:#c3e88d">"openai"</span>;

<span style="color:#82aaff">const</span> client = <span style="color:#82aaff">new</span> OpenAI({
  baseURL: <span style="color:#c3e88d">"https://api.arkeapi.com/v1"</span>,
  apiKey: process.env.<span style="color:#ff9580">ARKE_API_KEY</span>,
});

<span style="color:#82aaff">const</span> response = <span style="color:#c792ea">await</span> client.chat.completions.create({
  model: <span style="color:#c3e88d">"gpt-4o"</span>,
  messages: [{ role: <span style="color:#c3e88d">"user"</span>, content: <span style="color:#c3e88d">"Hello!"</span> }],
});

console.<span style="color:#82aaff">log</span>(response.choices[<span style="color:#f78c6c">0</span>].message.content);
<span style="color:rgba(255,255,255,0.28)">// &gt; Hello! How can I help you today?</span>`

const TABS = [
  { lang: 'Python', code: PYTHON_CODE },
  { lang: 'JavaScript', code: JS_CODE },
]

const STATS = [
  { label: 'Models', value: '15+' },
  { label: 'Avg Latency', value: '<60ms' },
  { label: 'Uptime', value: '99.9%' },
]

export function Hero() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section
      className="min-h-[88vh] flex items-center border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">

          {/* Left: Flat code card */}
          <div className="order-2 lg:order-1">
            <div
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: '#111112',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Minimal tab row */}
              <div
                className="flex items-center gap-0 px-5 pt-4 pb-0"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                {TABS.map((t, i) => (
                  <button
                    key={t.lang}
                    onClick={() => setActiveTab(i)}
                    className="px-3 pb-3 text-xs font-mono font-medium transition-colors"
                    style={{
                      color: i === activeTab ? '#EFEFED' : 'rgba(255,255,255,0.3)',
                      borderBottom: i === activeTab ? '1px solid #FF4F00' : '1px solid transparent',
                      marginBottom: '-1px',
                    }}
                  >
                    {t.lang}
                  </button>
                ))}
              </div>

              {/* Code */}
              <pre
                className="px-6 py-5 text-sm font-mono leading-[1.85] overflow-x-auto"
                style={{ color: 'rgba(255,255,255,0.75)' }}
                dangerouslySetInnerHTML={{ __html: TABS[activeTab].code }}
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <p
              className="text-xs font-bold uppercase mb-6"
              style={{ color: '#FF4F00', letterSpacing: '0.12em', textShadow: '0 0 10px rgba(255,79,0,0.25)' }}
            >
              OpenAI-Compatible · 15+ Models
            </p>

            <h1
              className="leading-[1.02] mb-7"
              style={{
                fontSize: 'clamp(2.6rem, 4.5vw, 3.6rem)',
                letterSpacing: '-0.04em',
                color: 'var(--foreground)',
                fontWeight: 400,
              }}
            >
              One key.<br />
              Every model.<br />
              <span style={{ color: '#FF4F00' }}>Zero limits.</span>
            </h1>

            <p
              className="text-lg mb-10 leading-relaxed"
              style={{ color: 'var(--muted-text)', maxWidth: '22rem', lineHeight: '1.8' }}
            >
              Drop-in OpenAI replacement. Access GPT-4o, Claude 3.5, Gemini and more through one gateway. Token quota never expires.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-14">
              <Link
                href="/dashboard"
                className="inline-flex items-center h-12 px-8 text-sm font-bold text-white rounded-full transition-opacity hover:opacity-88"
                style={{ backgroundColor: '#FF4F00', letterSpacing: '-0.005em' }}
              >
                Get Started →
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center h-12 px-7 text-sm font-medium rounded-full border transition-colors hover:opacity-70"
                style={{ color: 'var(--foreground)', borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
              >
                View Docs →
              </Link>
            </div>

            {/* Stats */}
            <div
              className="flex flex-wrap gap-10 pt-8 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold" style={{ letterSpacing: '-0.03em' }}>
                    {s.value}
                  </p>
                  <p
                    className="text-xs font-semibold uppercase mt-1"
                    style={{ color: 'var(--muted-text)', letterSpacing: '0.08em' }}
                  >
                    {s.label}
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
