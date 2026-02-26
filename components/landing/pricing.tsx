'use client'
import { useCheckout } from '@/hooks/use-checkout'
import { PLANS } from '@/lib/plans'
import { Check } from 'lucide-react'

export function Pricing() {
  const { checkout, loading, error } = useCheckout()

  return (
    <section id="pricing" className="border-t" style={{ borderColor: '#D4D3CC' }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Section header */}
        <div className="mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#6B6B6B', letterSpacing: '0.08em' }}
          >
            Pricing
          </p>
          <h2
            className="text-4xl font-semibold tracking-tight mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            Simple, transparent pricing.
          </h2>
          <p className="text-base max-w-md" style={{ color: '#6B6B6B' }}>
            One-time purchase. Token quota never expires. No subscriptions.
          </p>
        </div>

        {/* Plan grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="relative p-8 rounded-lg border"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: plan.highlighted ? '#F4793E' : '#D4D3CC',
                boxShadow: plan.highlighted ? '0 0 0 1px #F4793E' : 'none',
              }}
            >
              {plan.highlighted && (
                <div
                  className="absolute -top-3 left-8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white rounded"
                  style={{ backgroundColor: '#F4793E', letterSpacing: '0.06em' }}
                >
                  Most Popular
                </div>
              )}

              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: '#6B6B6B', letterSpacing: '0.08em' }}
              >
                {plan.name}
              </p>
              <p className="text-sm mb-6" style={{ color: '#6B6B6B' }}>{plan.description}</p>

              <p className="text-4xl font-bold tracking-tight mb-1" style={{ letterSpacing: '-0.02em' }}>
                {plan.price}
              </p>
              <p className="text-sm mb-2" style={{ color: '#6B6B6B' }}>
                {plan.quota} quota
              </p>
              <p className="text-xs mb-8" style={{ color: '#6B6B6B' }}>One-time · never expires</p>

              <ul className="space-y-2.5 mb-8">
                {plan.models.map((model) => (
                  <li key={model} className="flex items-center gap-3">
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: '#F4793E' }} />
                    <span className="font-mono text-xs">{model}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => checkout(plan.priceId)}
                disabled={loading !== null}
                className="w-full h-11 rounded text-sm font-medium transition-colors disabled:opacity-60"
                style={{
                  backgroundColor: plan.highlighted ? '#F4793E' : '#0A0A0A',
                  color: '#FFFFFF',
                }}
              >
                {loading === plan.priceId ? 'Redirecting...' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Code snippet */}
        <div
          className="mt-14 rounded-lg p-6 font-mono text-sm overflow-x-auto"
          style={{ backgroundColor: '#0A0A0A', color: 'rgba(255,255,255,0.75)' }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}
          >
            Quick Start
          </p>
          <pre className="text-xs leading-relaxed">{`curl https://api.arkeapi.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-arke-..." \\
  -H "Content-Type: application/json" \\
  -d '{"model": "gpt-4o-mini", "messages": [{"role": "user", "content": "Hello"}]}'`}</pre>
        </div>

        {error && (
          <p className="mt-4 text-sm text-center" style={{ color: '#E53E3E' }}>{error}</p>
        )}
      </div>
    </section>
  )
}
