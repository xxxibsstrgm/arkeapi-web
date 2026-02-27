'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface TokenInfo {
  name: string
  total_granted: number
  total_used: number
  total_available: number
  unlimited_quota: boolean
  expires_at: number
}

interface DashboardContextType {
  apiKey: string | null
  tokenInfo: TokenInfo | null
  isLoading: boolean
  setApiKey: (key: string, info: TokenInfo) => void
  logout: () => void
  refreshUsage: () => Promise<void>
}

const DashboardContext = createContext<DashboardContextType | null>(null)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string | null>(null)
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('arke_api_key')
    const storedInfo = localStorage.getItem('arke_token_info')
    if (stored && storedInfo) {
      try {
        setApiKeyState(stored)
        setTokenInfo(JSON.parse(storedInfo))
      } catch {
        localStorage.removeItem('arke_api_key')
        localStorage.removeItem('arke_token_info')
      }
    }
    setIsLoading(false)
  }, [])

  const setApiKey = useCallback((key: string, info: TokenInfo) => {
    localStorage.setItem('arke_api_key', key)
    localStorage.setItem('arke_token_info', JSON.stringify(info))
    setApiKeyState(key)
    setTokenInfo(info)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('arke_api_key')
    localStorage.removeItem('arke_token_info')
    setApiKeyState(null)
    setTokenInfo(null)
  }, [])

  const refreshUsage = useCallback(async () => {
    if (!apiKey) return
    const res = await fetch('/api/dashboard/usage', {
      headers: { 'x-api-key': apiKey },
    })
    if (res.ok) {
      const data = await res.json()
      setTokenInfo(data)
      localStorage.setItem('arke_token_info', JSON.stringify(data))
    }
  }, [apiKey])

  return (
    <DashboardContext.Provider value={{ apiKey, tokenInfo, isLoading, setApiKey, logout, refreshUsage }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard must be used inside DashboardProvider')
  return ctx
}
