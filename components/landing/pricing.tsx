'use client'
import { useCheckout } from '@/hooks/use-checkout'
import { PLANS } from '@/lib/plans'
import { Check, Copy, CheckCheck } from 'lucide-react'
import { useState } from 'react'

const CURL_SNIPPET = `curl https://api.arkeapi.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-arke-..." \\
  -H "Content-Type: application/json" \\
  -d '{"model": "gpt-4o-mini", "messages": [{"role": "user", "content": "Hello"}]}'`

export function Pricing() {
  const { checkout, loading, error } = useCheckout()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(CURL_SNIPPET)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="pricing" className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--muted-text)', letterSpacing: '0.08em' }}>
            Pricing
          </p>
          <h2 className="text-4xl font-semibold tracking-tight mb-3"
            style={{ letterSpacing: '-0.02em' }}>
            Simple, transparent pricing.
          </h2>
          <p className="text-base max-w-md" style={{ color: 'var(--muted-text)' }}>
            One-time purchase. Token quota never expires. No subscriptions.
          </p>
        </div>

        {/* Plan grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <div key={plan.id} className="relative p-8 rounded-lg border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: plan.highlighted ? '#ff3d00' : 'var(--border)',
                boxShadow: plan.highlighted ? '0 0 0 1px #ff3d00' : 'none',
              }}>
              {plan.highlighted && (
                <div className="absolute -top-3 left-8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white rounded"
                  style={{ backgroundColor: '#ff3d00', letterSpacing: '0.06em' }}>
                  Most Popular
                </div>
              )}

              <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: 'var(--muted-text)', letterSpacing: '0.08em' }}>
                {plan.name}
              </p>
              <p className="text-sm mb-6" style={{ color: 'var(--muted-text)' }}>
                {plan.description}
              </p>

              <p className="text-4xl font-bold tracking-tight mb-1"
                style={{ letterSpacing: '-0.02em' }}>
                {plan.price}
              </p>
              <p className="text-sm mb-1" style={{ color: 'var(--muted-text)' }}>
                {plan.quota} quota
              </p>
              <p className="text-xs mb-8" style={{ color: 'var(--muted-text)' }}>
                One-time · never expires
              </p>

              <ul className="space-y-2.5 mb-8">
                {plan.models.map((model) => (
                  <li key={model} className="flex items-center gap-3">
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: '#ff3d00' }} />
                    <span className="font-mono text-xs">{model}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => checkout(plan.priceId)}
                disabled={loading !== null}
                className="w-full h-11 rounded text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{
                  backgroundColor: plan.highlighted ? '#ff3d00' : 'var(--foreground)',
                  color: plan.highlighted ? '#FFFFFF' : 'var(--background)',
                }}>
                {loading === plan.priceId ? 'Redirecting...' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Quota explanation */}
        <div className="mt-6 p-4 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', color: 'var(--muted-text)' }}>
          <span className="font-medium" style={{ color: 'var(--foreground)' }}>About quota: </span>
          Pricing is based on model ratios. Higher-tier models (GPT-4o, Claude 3.5) consume quota faster than lightweight models (GPT-4o-mini, Gemini Flash).
          Check our{' '}
          <a href="https://api.arkeapi.com" target="_blank" rel="noopener noreferrer"
            className="underline underline-offset-2" style={{ color: '#ff3d00' }}>
            Model Plaza
          </a>
          {' '}for real-time model status and current ratios.
        </div>

        {/* Code snippet with copy button */}
        <div className="mt-10 rounded-lg overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="flex items-center justify-between px-6 py-3 border-b"
            style={{ borderColor: '#1A1A1A' }}>
            <p className="text-xs uppercase tracking-widest font-medium"
              style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
              Quick Start
            </p>
            <button onClick={handleCopy}
              className="flex items-center gap-2 text-xs transition-colors px-3 py-1 rounded"
              style={{ color: copied ? '#ff3d00' : 'rgba(255,255,255,0.4)' }}>
              {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="px-6 py-5 text-xs leading-relaxed overflow-x-auto"
            style={{ color: 'rgba(255,255,255,0.75)' }}>
            {CURL_SNIPPET}
          </pre>
        </div>

        {error && (
          <p className="mt-4 text-sm text-center" style={{ color: '#E53E3E' }}>{error}</p>
        )}
      </div>
    </section>
  )
}
