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
      <p className="text-sm mb-4" style={{ color: 'var(--muted-text)' }}>
        Last Updated: 14/Feb/2026
      </p>
      <p className="text-sm leading-relaxed mb-12" style={{ color: 'var(--muted-text)' }}>
        Welcome to ArkeAPI. By accessing or using our platform, edge-routing infrastructure, and related services (collectively, the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Service.
      </p>

      <div className="space-y-10" style={{ color: 'var(--foreground)' }}>

        <section>
          <h2 className="text-xl font-semibold mb-4" style={{ letterSpacing: '-0.015em' }}>
            1. Nature of the Service
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-text)' }}>
            ArkeAPI provides an advanced Intelligent API Gateway and Compute Routing Infrastructure. Our Service is designed to offer developers enhanced capabilities, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm mb-4" style={{ color: 'var(--muted-text)' }}>
            <li>Unified endpoint management and protocol standardization.</li>
            <li>High-availability routing, automatic failover, and load balancing.</li>
            <li>Edge-optimized network connectivity for reduced latency.</li>
            <li>Advanced analytics and unified billing architecture.</li>
          </ul>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            You acknowledge that ArkeAPI is a value-added infrastructure provider. In providing the Service, ArkeAPI routes your computational requests through various underlying distributed networks, compute clusters, and generative environments (collectively, &quot;Underlying Compute Providers&quot;). We do not claim ownership of the underlying models or algorithms utilized during the routing process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4" style={{ letterSpacing: '-0.015em' }}>
            2. Compute Credits and Billing
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-text)' }}>
            Access to our infrastructure is metered using internal standardized units (&quot;Compute Credits&quot; or &quot;Quota&quot;).
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm" style={{ color: 'var(--muted-text)' }}>
            <li><span className="font-medium" style={{ color: 'var(--foreground)' }}>Service Consumption:</span> Compute Credits are consumed based on the computational intensity, bandwidth, and routing resources required to process your requests through our network and the corresponding Underlying Compute Providers.</li>
            <li><span className="font-medium" style={{ color: 'var(--foreground)' }}>Dynamic Exchange Rates:</span> The conversion rate between Compute Credits and the actual processing cost is subject to dynamic change based on network load, infrastructure maintenance costs, and the pricing fluctuations of the Underlying Compute Providers.</li>
            <li><span className="font-medium" style={{ color: 'var(--foreground)' }}>Non-Refundable:</span> All purchases of Compute Credits are final and non-refundable, as computational resources and network bandwidth are instantly allocated and consumed upon your request.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4" style={{ letterSpacing: '-0.015em' }}>
            3. Acceptable Use Policy and Downstream Compliance
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-text)' }}>
            Your use of the Service must be lawful and ethical. Because our infrastructure interfaces with third-party generative environments, you are strictly prohibited from using ArkeAPI to bypass safety filters, generate illegal content, distribute malware, or engage in any activity that violates standard industry Acceptable Use Policies.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm" style={{ color: 'var(--muted-text)' }}>
            <li><span className="font-medium" style={{ color: 'var(--foreground)' }}>Account Suspension:</span> We employ automated heuristics to monitor network traffic. If your requests are deemed malicious, abusive, or if they trigger safety mechanisms from our Underlying Compute Providers, ArkeAPI reserves the right to immediately isolate your traffic, suspend your API keys, or permanently terminate your account without notice or refund.</li>
            <li><span className="font-medium" style={{ color: 'var(--foreground)' }}>Indemnification:</span> You agree to indemnify and hold ArkeAPI harmless from any claims, losses, or damages (including the suspension or banning of our infrastructure nodes) resulting from your violation of this Acceptable Use Policy.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4" style={{ letterSpacing: '-0.015em' }}>
            4. Service Availability and Disclaimer of Warranties
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-text)' }}>
            While ArkeAPI strives for maximum uptime through our failover systems, the Service relies heavily on the stability of Underlying Compute Providers.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm" style={{ color: 'var(--muted-text)' }}>
            <li><span className="font-medium" style={{ color: 'var(--foreground)' }}>No Guarantee of Output:</span> We do not guarantee the accuracy, reliability, or appropriateness of the data returned through our routing infrastructure.</li>
            <li>
              <span className="font-medium" style={{ color: 'var(--foreground)' }}>&quot;As Is&quot; Basis:</span>{' '}
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. ARKEAPI DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING FITNESS FOR A PARTICULAR PURPOSE. WE ARE NOT LIABLE FOR ANY DOWN-STREAM LATENCY OR SERVICE DEGRADATION OUTSIDE OF OUR DIRECT INFRASTRUCTURE CONTROL.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4" style={{ letterSpacing: '-0.015em' }}>
            5. Limitation of Liability
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ARKEAPI BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS INTERRUPTION. ArkeAPI&apos;s total cumulative liability to you for any claims arising out of this agreement shall not exceed the amount you paid to ArkeAPI for the Compute Credits consumed in the thirty (30) days preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4" style={{ letterSpacing: '-0.015em' }}>
            6. Governing Law and Dispute Resolution
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the operating entity of ArkeAPI is formally incorporated or where its primary server infrastructure is located, without giving effect to any principles of conflicts of law. Any disputes shall be resolved exclusively in the competent courts of that same jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4" style={{ letterSpacing: '-0.015em' }}>
            Contact
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            For questions about these Terms, contact us at{' '}
            <a href="mailto:support@arkeapi.com" style={{ color: '#FF4F00' }}>
              support@arkeapi.com
            </a>.
          </p>
        </section>

      </div>
    </main>
  )
}
