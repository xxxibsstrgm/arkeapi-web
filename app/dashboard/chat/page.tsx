'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Square, ChevronDown } from 'lucide-react'
import { useDashboard } from '@/lib/dashboard-context'
import { AuthGuard } from '@/components/dashboard/auth-guard'
import { MODEL_CATALOG } from '@/lib/model-catalog'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const CHAT_MODELS = Object.keys(MODEL_CATALOG).filter(
  id => MODEL_CATALOG[id].caps.length > 0 && !MODEL_CATALOG[id].caps.includes('embedding')
)

export default function ChatPage() {
  return (
    <AuthGuard>
      <ChatContent />
    </AuthGuard>
  )
}

function ChatContent() {
  const { apiKey } = useDashboard()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [model, setModel] = useState('gpt-4o-mini')
  const [temperature, setTemperature] = useState(0.7)
  const [streaming, setStreaming] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    if (!input.trim() || streaming || !apiKey) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setStreaming(true)

    const assistantMsg: Message = { role: 'assistant', content: '' }
    setMessages(prev => [...prev, assistantMsg])

    const abort = new AbortController()
    abortRef.current = abort

    try {
      const res = await fetch('/api/dashboard/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, model, apiKey, temperature }),
        signal: abort.signal,
      })

      if (!res.ok || !res.body) {
        setMessages(prev => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: 'assistant', content: '⚠ Error: ' + res.statusText }
          return copy
        })
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') continue
          try {
            const chunk = JSON.parse(data)
            const delta = chunk.choices?.[0]?.delta?.content ?? ''
            if (delta) {
              setMessages(prev => {
                const copy = [...prev]
                copy[copy.length - 1] = {
                  ...copy[copy.length - 1],
                  content: copy[copy.length - 1].content + delta,
                }
                return copy
              })
            }
          } catch { /* ignore parse errors */ }
        }
      }
    } catch (e: unknown) {
      if ((e as Error).name !== 'AbortError') {
        setMessages(prev => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: 'assistant', content: '⚠ Connection error.' }
          return copy
        })
      }
    } finally {
      setStreaming(false)
      abortRef.current = null
    }
  }

  function stop() {
    abortRef.current?.abort()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left settings panel */}
      <div
        className="w-56 shrink-0 border-r px-4 py-6 flex flex-col gap-5"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
      >
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted-text)', letterSpacing: '0.08em' }}>
            Model
          </label>
          <div className="relative">
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full h-9 pl-3 pr-8 rounded-lg text-sm border appearance-none outline-none"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              {CHAT_MODELS.map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: 'var(--muted-text)' }} />
          </div>
          {MODEL_CATALOG[model] && (
            <p className="text-xs mt-1.5" style={{ color: 'var(--muted-text)' }}>
              {MODEL_CATALOG[model].provider} · {MODEL_CATALOG[model].context} ctx
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted-text)', letterSpacing: '0.08em' }}>
            Temperature: {temperature}
          </label>
          <input
            type="range" min={0} max={2} step={0.1}
            value={temperature}
            onChange={e => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-[#ff3d00]"
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--muted-text)' }}>
            <span>Precise</span><span>Creative</span>
          </div>
        </div>

        <button
          onClick={() => setMessages([])}
          className="text-xs px-3 py-2 rounded-lg border transition-colors hover:opacity-70"
          style={{ color: 'var(--muted-text)', borderColor: 'var(--border)' }}
        >
          Clear chat
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-base font-semibold mb-2">Playground</p>
              <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                Test any model with your API key. Select a model on the left and start chatting.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
                  }`}
                  style={
                    msg.role === 'user'
                      ? { backgroundColor: '#ff3d00', color: 'white' }
                      : { backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }
                  }
                >
                  {msg.content}
                  {msg.role === 'assistant' && streaming && i === messages.length - 1 && (
                    <span className="inline-block w-1.5 h-4 ml-0.5 animate-pulse" style={{ backgroundColor: 'var(--muted-text)' }} />
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          className="border-t px-6 py-4"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
        >
          <div
            className="flex items-end gap-3 rounded-xl border px-4 py-3"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          >
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${model}...`}
              className="flex-1 resize-none outline-none text-sm bg-transparent"
              style={{ color: 'var(--foreground)', maxHeight: '150px' }}
            />
            <button
              onClick={streaming ? stop : send}
              disabled={!streaming && !input.trim()}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-all disabled:opacity-30"
              style={{ backgroundColor: streaming ? 'var(--foreground)' : '#ff3d00' }}
            >
              {streaming
                ? <Square className="w-3.5 h-3.5 text-white" />
                : <Send className="w-3.5 h-3.5 text-white" />
              }
            </button>
          </div>
          <p className="text-xs mt-2 text-center" style={{ color: 'var(--muted-text)' }}>
            Enter to send · Shift+Enter for new line · responses consume your quota
          </p>
        </div>
      </div>
    </div>
  )
}
