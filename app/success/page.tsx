import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: '#F0EFE9' }}
    >
      <div className="max-w-md w-full text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ backgroundColor: 'rgba(255, 61, 0, 0.1)' }}
        >
          <CheckCircle className="w-8 h-8" style={{ color: '#ff3d00' }} />
        </div>

        <h1
          className="text-4xl font-semibold tracking-tight mb-4"
          style={{ letterSpacing: '-0.02em' }}
        >
          Payment confirmed.
        </h1>

        <p className="text-base mb-2" style={{ color: '#6B6B6B' }}>
          Your API key is on its way.
        </p>
        <p className="text-base mb-10" style={{ color: '#6B6B6B' }}>
          Check your inbox — you&apos;ll receive an email with your API key and
          setup instructions within a minute.
        </p>

        <div
          className="rounded-lg p-6 text-left mb-8 border"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#D4D3CC' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#6B6B6B', letterSpacing: '0.08em' }}
          >
            Next Steps
          </p>
          <ol className="space-y-3">
            {[
              'Open the welcome email from ArkeAPI',
              'Copy your API key',
              'Set OPENAI_BASE_URL=https://api.arkeapi.com/v1',
              'Start building',
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="font-semibold shrink-0" style={{ color: '#ff3d00' }}>
                  {i + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <Link
          href="/"
          className="text-sm transition-colors"
          style={{ color: '#6B6B6B' }}
        >
          ← Back to home
        </Link>
      </div>
    </main>
  )
}
