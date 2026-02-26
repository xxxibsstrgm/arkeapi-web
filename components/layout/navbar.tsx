import Link from 'next/link'

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{ backgroundColor: 'rgba(240, 239, 233, 0.85)', borderColor: '#D4D3CC' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight" style={{ color: '#0A0A0A' }}>
          ArkeAPI
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="#pricing"
            className="text-sm transition-colors"
            style={{ color: '#6B6B6B' }}
          >
            Pricing
          </Link>
          <a
            href="https://api.arkeapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors"
            style={{ color: '#6B6B6B' }}
          >
            Docs
          </a>
          <Link
            href="#pricing"
            className="text-sm px-4 py-2 rounded transition-colors text-white"
            style={{ backgroundColor: '#0A0A0A' }}
          >
            Get API Key
          </Link>
        </nav>
      </div>
    </header>
  )
}
