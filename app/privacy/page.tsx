import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — ArkeAPI',
}

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <Link href="/" className="text-sm transition-colors mb-10 inline-block"
        style={{ color: 'var(--muted-text)' }}>
        ← Back to home
      </Link>

      <h1 className="text-4xl font-semibold tracking-tight mb-2"
        style={{ letterSpacing: '-0.02em' }}>
        Privacy Policy
      </h1>
      <p className="text-sm mb-12" style={{ color: 'var(--muted-text)' }}>
        Last updated: February 2025
      </p>

      <div className="prose prose-sm max-w-none space-y-8" style={{ color: 'var(--foreground)' }}>
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Data We Collect</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted-text)' }}>
            When you purchase an API key, we collect:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: 'var(--muted-text)' }}>
            <li>Your email address (for API key delivery)</li>
            <li>Payment information (processed by Stripe — we never store card data)</li>
            <li>API usage metadata (token counts per model, timestamps)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. How We Use Your Data</h2>
          <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: 'var(--muted-text)' }}>
            <li>Deliver your API key via email</li>
            <li>Track quota usage and enforce limits</li>
            <li>Respond to support requests</li>
            <li>Detect abuse or policy violations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Data Sharing</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            We do not sell your personal data. API requests are forwarded to model providers (OpenAI, Anthropic, Google, etc.) as part of the service. Each provider's privacy policy applies to the content of your requests.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Data Retention</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            We retain your email and usage data for as long as your account is active. API request content is not logged or stored by ArkeAPI.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Cookies</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            The ArkeAPI website uses only functional cookies for theme preferences. No third-party tracking cookies are used.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            You may request deletion of your personal data at any time by emailing{' '}
            <a href="mailto:support@arkeapi.com" style={{ color: '#ff3d00' }}>
              support@arkeapi.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Contact</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            Questions about this policy? Contact us at{' '}
            <a href="mailto:support@arkeapi.com" style={{ color: '#ff3d00' }}>
              support@arkeapi.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  )
}
