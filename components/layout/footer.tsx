export function Footer() {
  return (
    <footer className="border-t py-12" style={{ borderColor: '#D4D3CC' }}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <p className="text-sm font-semibold">ArkeAPI</p>
        <p className="text-xs" style={{ color: '#6B6B6B' }}>
          © {new Date().getFullYear()} ArkeAPI. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="mailto:support@arkeapi.com"
            className="text-xs transition-colors"
            style={{ color: '#6B6B6B' }}
          >
            Support
          </a>
          <a
            href="https://api.arkeapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors"
            style={{ color: '#6B6B6B' }}
          >
            API Docs
          </a>
        </div>
      </div>
    </footer>
  )
}
