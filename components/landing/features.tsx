const FEATURES = [
  {
    label: 'Drop-in compatible',
    description: 'Change one line. Works with any OpenAI SDK.',
    code: 'base_url="https://api.arkeapi.com/v1"',
  },
  {
    label: 'Multi-model',
    description: 'GPT-4o, Claude 3.5, Gemini, and more through one key.',
    code: '"model": "claude-3-5-sonnet-20241022"',
  },
  {
    label: 'No expiry',
    description: 'Quota never expires. Use it at your own pace.',
    code: 'quota_expires: never',
  },
  {
    label: 'Singapore edge',
    description: 'DigitalOcean Singapore. Low latency across Asia-Pacific.',
    code: 'region: ap-southeast-1',
  },
]

export function Features() {
  return (
    <section
      className="border-t"
      style={{ borderColor: '#D4D3CC' }}
    >
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {FEATURES.map((f) => (
            <div key={f.label}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: '#6B6B6B', letterSpacing: '0.08em' }}
              >
                {f.label}
              </p>
              <p className="text-sm mb-4 leading-relaxed">{f.description}</p>
              <code
                className="text-xs font-mono px-2 py-1 rounded block truncate border"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#D4D3CC', color: '#6B6B6B' }}
              >
                {f.code}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
