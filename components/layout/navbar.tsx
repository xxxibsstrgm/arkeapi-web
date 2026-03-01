'use client'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon, Globe, Zap } from 'lucide-react'
import { useState } from 'react'

const LANGUAGES = [
  { code: 'en',    label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'ja',    label: '日本語' },
  { code: 'ko',    label: '한국어' },
  { code: 'es',    label: 'Español' },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [langOpen, setLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-[1440px] mx-auto px-10 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#FF4500' }}>
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold" style={{ letterSpacing: '-0.02em' }}>
            ArkeAPI
          </span>
        </Link>

        {/* Right nav */}
        <div className="flex items-center gap-1">
          <nav className="hidden md:flex items-center gap-7 mr-4">
            <Link href="#pricing"
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: 'var(--foreground)' }}>
              Pricing
            </Link>
            <Link href="/docs"
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: 'var(--foreground)' }}>
              Docs
            </Link>
            <Link href="/dashboard"
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: 'var(--foreground)' }}>
              Dashboard
            </Link>
          </nav>

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 h-9 px-2.5 rounded-lg text-sm transition-opacity hover:opacity-60"
              style={{ color: 'var(--muted-text)' }}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden md:inline text-xs font-semibold">
                {currentLang === 'en' ? 'EN' : currentLang.slice(0,2).toUpperCase()}
              </span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-11 w-40 rounded-xl border shadow-xl py-1 z-50"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                {LANGUAGES.map((lang) => (
                  <button key={lang.code}
                    onClick={() => { setCurrentLang(lang.code); setLangOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm transition-opacity hover:opacity-70"
                    style={{ color: lang.code === currentLang ? '#FF4500' : 'var(--foreground)' }}>
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9 flex items-center justify-center rounded-lg transition-opacity hover:opacity-60"
            style={{ color: 'var(--muted-text)' }}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link href="/dashboard"
            className="h-9 px-5 rounded-full text-sm font-bold text-white inline-flex items-center transition-opacity hover:opacity-88 ml-2"
            style={{ backgroundColor: '#FF4500' }}>
            Dashboard
          </Link>
        </div>

      </div>
    </header>
  )
}
