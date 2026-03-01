'use client'
import { useCheckout } from '@/hooks/use-checkout'
import { PLANS } from '@/lib/plans'
import { Check } from 'lucide-react'

export function Pricing() {
  const { checkout, loading, error } = useCheckout()

  return (
    <section id="pricing" className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 py-14 sm:py-20">
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
            style={{ fontSize: 'clamp(1.9rem, 5vw, 2.875rem)', letterSpacing: '-0.025em', lineHeight: 1.1, fontWeight: 400 }}
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

        {error && (
          <p className="mt-4 text-sm text-center" style={{ color: '#E53E3E' }}>{error}</p>
        )}
      </div>
    </section>
  )
}
