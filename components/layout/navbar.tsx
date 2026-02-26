'use client'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon, Globe } from 'lucide-react'
import { useState } from 'react'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'es', label: 'Español' },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [langOpen, setLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', opacity: 0.95 }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          ArkeAPI
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="#pricing" className="text-sm transition-colors hidden md:block"
            style={{ color: 'var(--muted-text)' }}>
            Pricing
          </Link>
          <a href="https://api.arkeapi.com" target="_blank" rel="noopener noreferrer"
            className="text-sm transition-colors hidden md:block"
            style={{ color: 'var(--muted-text)' }}>
            Docs
          </a>
          <a href="https://api.arkeapi.com" target="_blank" rel="noopener noreferrer"
            className="text-sm transition-colors hidden md:block"
            style={{ color: 'var(--muted-text)' }}>
            Dashboard
          </a>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm transition-colors p-2 rounded"
              style={{ color: 'var(--muted-text)' }}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden md:inline text-xs">
                {LANGUAGES.find(l => l.code === currentLang)?.label}
              </span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-10 w-40 rounded-lg border shadow-lg py-1 z-50"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setCurrentLang(lang.code); setLangOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm transition-colors"
                    style={{
                      color: lang.code === currentLang ? '#ff3d00' : 'var(--foreground)',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded transition-colors"
            style={{ color: 'var(--muted-text)' }}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link href="#pricing"
            className="text-sm px-4 py-2 rounded transition-colors text-white font-medium"
            style={{ backgroundColor: '#ff3d00' }}>
            Get API Key
          </Link>
        </nav>
      </div>
    </header>
  )
}
