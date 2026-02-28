'use client'
import { useState } from 'react'

const FEATURES = [
  {
    label: 'Drop-in compatible',
    description: 'Change one line. Works with any OpenAI SDK — no code refactor needed.',
    highlightLines: [2],
  },
  {
    label: 'Multi-model',
    description: 'GPT-4o, Claude 3.5, Gemini, DeepSeek and more through one key.',
    highlightLines: [6, 7, 8, 9],
  },
  {
    label: 'No expiry',
    description: 'Purchased quota never expires. Use it at your own pace, on your own timeline.',
    highlightLines: [12],
  },
  {
    label: 'Singapore edge',
    description: 'DigitalOcean Singapore. Sub-60ms median latency across Asia-Pacific.',
    highlightLines: [15],
  },
]

// Each entry: [lineContent, isComment]
const CODE_LINES: [string, boolean][] = [
  ['# ArkeAPI — drop-in OpenAI replacement', true],
  ['OPENAI_BASE_URL=https://api.arkeapi.com/v1', false],
  ['OPENAI_API_KEY=sk-arke-...', false],
  ['', false],
  ['# Choose any model via a single key', true],
  ['MODEL=gpt-4o', false],
  ['# MODEL=claude-3-5-sonnet-20241022', true],
  ['# MODEL=gemini-2.0-flash', true],
  ['# MODEL=deepseek-chat', true],
  ['', false],
  ['# Quota never expires', true],
  ['QUOTA_POLICY=never_expires', false],
  ['', false],
  ['# Routed via Singapore edge', true],
  ['REGION=ap-southeast-1', false],
]

export function Features() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = FEATURES[activeIdx]

  return (
    <section className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1440px] mx-auto px-10 py-20">

        {/* Section header */}
        <div className="text-center mb-14">
          <p
            className="uppercase mb-4"
            style={{ fontSize: '12px', color: '#FF4500', letterSpacing: '0.15em', textShadow: '0 0 10px rgba(255,69,0,0.25)' }}
          >
            Developer-first
          </p>
          <h2
            style={{ fontSize: '46px', letterSpacing: '-0.025em', lineHeight: 1.1, fontWeight: 400 }}
          >
            Built for developers who ship fast.
          </h2>
        </div>

        {/* Two-column: tabs left, code right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">

          {/* Left: feature tabs */}
          <div className="flex flex-col gap-1">
            {FEATURES.map((f, i) => (
              <button
                key={f.label}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                className="text-left px-5 py-4 rounded-lg transition-colors"
                style={{
                  backgroundColor: i === activeIdx ? 'var(--surface)' : 'transparent',
                  borderLeft: `2px solid ${i === activeIdx ? '#FF4500' : 'transparent'}`,
                }}
              >
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: i === activeIdx ? 'var(--foreground)' : 'var(--muted-text)' }}
                >
                  {f.label}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--muted-text)', display: i === activeIdx ? 'block' : 'none' }}
                >
                  {f.description}
                </p>
              </button>
            ))}
          </div>

          {/* Right: code block with line highlighting */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: '#161618', border: '1px solid #2A2A2C' }}
          >
            {/* Titlebar */}
            <div
              className="flex items-center gap-2 px-5 py-3 border-b"
              style={{ borderColor: '#2A2A2C', backgroundColor: '#111113' }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3A3A3C' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3A3A3C' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3A3A3C' }} />
              <span
                className="ml-3 text-xs font-mono"
                style={{ color: '#555553' }}
              >
                .env
              </span>
            </div>

            {/* Code lines */}
            <div className="py-5 overflow-x-auto">
              {CODE_LINES.map(([line, isComment], i) => {
                const isHighlighted = active.highlightLines.includes(i)
                return (
                  <div
                    key={i}
                    className="flex items-center px-5 transition-colors"
                    style={{
                      backgroundColor: isHighlighted ? 'rgba(255,69,0,0.1)' : 'transparent',
                      minHeight: '1.85em',
                    }}
                  >
                    {/* Line number */}
                    <span
                      className="select-none text-xs font-mono mr-6 shrink-0 text-right"
                      style={{ color: isHighlighted ? '#FF4500' : '#3A3A38', minWidth: '1.5rem' }}
                    >
                      {line === '' ? '' : i + 1}
                    </span>
                    {/* Line content */}
                    <span
                      className="text-sm font-mono leading-[1.85] whitespace-pre"
                      style={{
                        color: isHighlighted
                          ? '#FF6A3D'
                          : isComment
                          ? 'rgba(255,255,255,0.25)'
                          : 'rgba(255,255,255,0.68)',
                      }}
                    >
                      {line}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
