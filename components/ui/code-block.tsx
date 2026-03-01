'use client'
import { useState } from 'react'
import { Copy, CheckCheck } from 'lucide-react'

interface Tab {
  lang: string
  /** Pre-rendered HTML string with inline <span> syntax highlighting */
  code: string
}

interface CodeBlockProps {
  tabs: Tab[]
  className?: string
}

export function CodeBlock({ tabs, className = '' }: CodeBlockProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [copied, setCopied] = useState(false)

  const active = tabs[activeIdx]

  const handleCopy = () => {
    // Strip HTML tags to get plain text
    const plain = active.code.replace(/<[^>]+>/g, '')
    navigator.clipboard.writeText(plain.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Split into lines for line-number rendering
  const lines = active.code.split('\n')

  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
      style={{ backgroundColor: '#161618', border: '1px solid #2A2A2C' }}
    >
      {/* Tab bar */}
      <div
        className="flex items-center border-b"
        style={{ borderColor: '#2A2A2C', backgroundColor: '#111113' }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.lang}
            onClick={() => setActiveIdx(i)}
            className="px-5 py-3 text-xs font-mono uppercase tracking-widest transition-colors"
            style={{
              color: i === activeIdx ? '#F5F5F3' : '#555553',
              borderBottom: i === activeIdx ? '2px solid #F5F5F3' : '2px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {tab.lang}
          </button>
        ))}

        {/* Copy button — right side */}
        <button
          onClick={handleCopy}
          className="ml-auto mr-4 flex items-center gap-1.5 text-xs py-1.5 px-3 rounded transition-colors"
          style={{ color: copied ? '#FF4F00' : '#555553' }}
          title="Copy code"
        >
          {copied ? (
            <CheckCheck className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="flex overflow-x-auto py-6">
        {/* Line numbers */}
        <div
          className="select-none shrink-0 pl-5 pr-5 text-right"
          style={{ color: '#3A3A38', minWidth: '3rem' }}
        >
          {lines.map((_, i) => (
            <div key={i} className="text-xs font-mono leading-[1.85]">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Syntax-highlighted code */}
        <pre
          className="text-sm leading-[1.85] pr-8 flex-1 overflow-x-auto"
          style={{
            fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", monospace',
            color: 'rgba(255,255,255,0.68)',
          }}
          dangerouslySetInnerHTML={{ __html: active.code }}
        />
      </div>
    </div>
  )
}
