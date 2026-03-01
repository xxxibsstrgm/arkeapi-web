'use client'
import { useCheckout } from '@/hooks/use-checkout'
import { PLANS } from '@/lib/plans'
import { Check } from 'lucide-react'
import { CodeBlock } from '@/components/ui/code-block'

const CURL_HTML = `<span style="color:#82aaff">curl</span> https://api.arkeapi.com/v1/chat/completions \\
  -H <span style="color:#c3e88d">"Authorization: Bearer sk-arke-..."</span> \\
  -H <span style="color:#c3e88d">"Content-Type: application/json"</span> \\
  -d <span style="color:#c3e88d">'{"model": "gpt-4o-mini", "messages": [{"role": "user", "content": "Hello"}]}'</span>`

const PYTHON_HTML = `<span style="color:#c792ea">from</span> openai <span style="color:#c792ea">import</span> OpenAI

client = OpenAI(
    base_url=<span style="color:#c3e88d">"https://api.arkeapi.com/v1"</span>,
    api_key=<span style="color:#c3e88d">"sk-arke-..."</span>,
)

response = client.chat.completions.create(
    model=<span style="color:#c3e88d">"gpt-4o-mini"</span>,
    messages=[{<span style="color:#c3e88d">"role"</span>: <span style="color:#c3e88d">"user"</span>, <span style="color:#c3e88d">"content"</span>: <span style="color:#c3e88d">"Hello!"</span>}],
)
<span style="color:#82aaff">print</span>(response.choices[<span style="color:#f78c6c">0</span>].message.content)`

const QUICK_START_TABS = [
  { lang: 'cURL', code: CURL_HTML },
  { lang: 'Python', code: PYTHON_HTML },
]

export function Pricing() {
  const { checkout, loading, error } = useCheckout()

  return (
    <section
      id="pricing"
      className="border-t"
      style={{
        borderColor: 'var(--border)',
        background: 'linear-gradient(180deg, #0D0D0E 0%, #111112 50%, #131315 100%)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-10 py-20">
        {/* Section header */}
        <div className="text-center mb-14">
          <p
            className="uppercase mb-4"
            style={{ fontSize: '12px', color: '#FF4F00', letterSpacing: '0.15em', textShadow: '0 0 10px rgba(255,79,0,0.25)' }}
          >
            Pricing
          </p>
          <h2
            className="mb-4"
            style={{ fontSize: '46px', letterSpacing: '-0.025em', lineHeight: 1.1, fontWeight: 400 }}
          >
            Simple, transparent pricing.
          </h2>
          <p className="text-base" style={{ color: 'var(--muted-text)' }}>
            One-time purchase. Token quota never expires. No subscriptions.
          </p>
        </div>

        {/* Plan grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <div key={plan.id} className="metal-card relative p-8 rounded-lg border cursor-default"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: plan.highlighted ? '#FF4F00' : 'var(--border)',
                boxShadow: plan.highlighted
                  ? '0 0 0 1px #FF4F00, inset 0 1px 0 rgba(255,255,255,0.72)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.72), inset 0 -1px 0 rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04)',
              }}>
              {plan.highlighted && (
                <div className="absolute -top-3 left-8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white rounded"
                  style={{ backgroundColor: '#FF4F00', letterSpacing: '0.06em' }}>
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
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: '#FF4F00' }} />
                    <span className="font-mono text-xs">{model}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => checkout(plan.priceId)}
                disabled={loading !== null}
                className="w-full h-11 rounded text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{
                  backgroundColor: plan.highlighted ? '#FF4F00' : 'var(--foreground)',
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
            className="underline underline-offset-2" style={{ color: '#FF4F00' }}>
            Model Plaza
          </a>
          {' '}for real-time model status and current ratios.
        </div>

        {/* Quick start code block */}
        <div className="mt-10">
          <CodeBlock tabs={QUICK_START_TABS} />
        </div>

        {error && (
          <p className="mt-4 text-sm text-center" style={{ color: '#E53E3E' }}>{error}</p>
        )}
      </div>
    </section>
  )
}
