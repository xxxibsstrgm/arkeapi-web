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
    <section className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.label}
              className="p-10 border-r border-b group transition-colors cursor-default"
              style={{
                borderColor: 'var(--border)',
                borderRightColor: i === FEATURES.length - 1 ? 'transparent' : 'var(--border)',
              }}
            >
              <p
                className="text-xs font-mono uppercase mb-4"
                style={{ color: 'var(--muted-text)', letterSpacing: '0.1em' }}
              >
                {f.label}
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
                {f.description}
              </p>
              <code
                className="text-xs font-mono px-3 py-1.5 rounded-sm block truncate border"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--muted-text)',
                }}
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
