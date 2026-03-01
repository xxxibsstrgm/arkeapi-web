import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1440px] mx-auto px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-base font-semibold mb-3">ArkeAPI</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
              Global high-speed AI gateway. One key, 15+ models, zero rate limits on purchased quota.
            </p>
          </div>

          {/* Products */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'var(--muted-text)', letterSpacing: '0.08em' }}>
              Products
            </p>
            <ul className="space-y-3">
              <li>
                <Link href="#pricing" className="text-sm transition-colors hover:opacity-80"
                  style={{ color: 'var(--muted-text)' }}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard/chat"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: 'var(--muted-text)' }}>
                  AI Chat
                </Link>
              </li>
              <li>
                <Link href="/dashboard"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: 'var(--muted-text)' }}>
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: 'var(--muted-text)' }}>
                  OpenClaw
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'var(--muted-text)', letterSpacing: '0.08em' }}>
              Resources
            </p>
            <ul className="space-y-3">
              <li>
                <Link href="/docs"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: 'var(--muted-text)' }}>
                  API Docs
                </Link>
              </li>
              <li>
                <a href="mailto:support@arkeapi.com"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: 'var(--muted-text)' }}>
                  Support
                </a>
              </li>
              <li>
                <a href="https://api.arkeapi.com" target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: 'var(--muted-text)' }}>
                  Status
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'var(--muted-text)', letterSpacing: '0.08em' }}>
              Legal
            </p>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-sm transition-colors hover:opacity-80"
                  style={{ color: 'var(--muted-text)' }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm transition-colors hover:opacity-80"
                  style={{ color: 'var(--muted-text)' }}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--muted-text)' }}>
            © {new Date().getFullYear()} ArkeAPI. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--muted-text)' }}>
            Fast · Reliable · Universal
          </p>
        </div>
      </div>
    </footer>
  )
}
