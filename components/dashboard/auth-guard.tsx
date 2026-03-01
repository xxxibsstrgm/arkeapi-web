'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDashboard } from '@/lib/dashboard-context'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { apiKey, isLoading } = useDashboard()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !apiKey) {
      router.push('/dashboard')
    }
  }, [apiKey, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div
          className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: '#FF4F00', borderTopColor: 'transparent' }}
        />
      </div>
    )
  }

  if (!apiKey) return null

  return <>{children}</>
}
