import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — ArkeAPI',
}

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <Link href="/" className="text-sm transition-colors mb-10 inline-block"
        style={{ color: 'var(--muted-text)' }}>
        ← Back to home
      </Link>

      <h1 className="text-4xl font-semibold tracking-tight mb-2"
        style={{ letterSpacing: '-0.02em' }}>
        Terms of Service
      </h1>
      <p className="text-sm mb-12" style={{ color: 'var(--muted-text)' }}>
        Last updated: February 2025
      </p>

      <div className="prose prose-sm max-w-none space-y-8" style={{ color: 'var(--foreground)' }}>
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            By purchasing an API key or using ArkeAPI services, you agree to these Terms of Service. If you do not agree, do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            ArkeAPI provides access to multiple large language model APIs through a unified OpenAI-compatible endpoint. Token quotas are purchased on a one-time basis and do not expire.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Acceptable Use</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted-text)' }}>
            You may not use ArkeAPI to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: 'var(--muted-text)' }}>
            <li>Generate illegal, harmful, or abusive content</li>
            <li>Violate the terms of underlying model providers (OpenAI, Anthropic, Google, etc.)</li>
            <li>Attempt to circumvent rate limits or security measures</li>
            <li>Resell or redistribute API access without authorization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Payments and Refunds</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            All purchases are final. Quotas are non-refundable once an API key has been issued. In the event of a technical failure on our part that prevents key delivery, we will issue a replacement or full refund.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Service Availability</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            We strive for high availability but do not guarantee uninterrupted service. Downtime caused by upstream model providers is outside our control. Token quotas are never deducted during service outages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            ArkeAPI is provided "as is". We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Contact</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            For questions about these terms, contact us at{' '}
            <a href="mailto:support@arkeapi.com" style={{ color: '#ff3d00' }}>
              support@arkeapi.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  )
}
