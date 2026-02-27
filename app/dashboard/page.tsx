'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useDashboard } from '@/lib/dashboard-context'

export default function DashboardLoginPage() {
  const [key, setKey] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setApiKey, apiKey, isLoading } = useDashboard()

  // Already logged in — redirect
  useEffect(() => {
    if (!isLoading && apiKey) {
      router.push('/dashboard/overview')
    }
  }, [apiKey, isLoading, router])

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault()
    if (!key.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/dashboard/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: key.trim() }),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Invalid API key. Please check and try again.')
        return
      }
      const info = await res.json()
      setApiKey(key.trim(), info)
      router.push('/dashboard/overview')
    } catch {
      setError('Connection failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) return null

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#ff3d00' }}
          >
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold" style={{ letterSpacing: '-0.02em' }}>ArkeAPI</span>
        </div>

        <h1 className="text-2xl font-bold mb-1.5" style={{ letterSpacing: '-0.025em' }}>
          Connect your API key
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--muted-text)' }}>
          Enter the API key from your welcome email to access your dashboard.
        </p>

        <form onSubmit={handleConnect} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              placeholder="sk-arke-..."
              value={key}
              onChange={e => setKey(e.target.value)}
              className="w-full h-12 px-4 pr-12 rounded-xl text-sm font-mono outline-none border transition-colors"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: error ? '#ef4444' : 'var(--border)',
                color: 'var(--foreground)',
              }}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShow(v => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--muted-text)' }}
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !key.trim()}
            className="w-full h-12 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: '#ff3d00' }}
          >
            {loading ? (
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>Connect <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <p className="text-xs mt-8 text-center" style={{ color: 'var(--muted-text)' }}>
          Don&apos;t have an API key?{' '}
          <a href="/#pricing" className="hover:opacity-80 transition-opacity" style={{ color: '#ff3d00' }}>
            Purchase a plan →
          </a>
        </p>
      </div>
    </div>
  )
}
