'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Sun, Moon, Globe, Menu, X } from 'lucide-react'
import { useState } from 'react'

const LANGUAGES = [
  { code: 'en',    label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'ja',    label: '日本語' },
  { code: 'ko',    label: '한국어' },
  { code: 'es',    label: 'Español' },
]

const NAV_LINKS = [
  { href: '#pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
  { href: '/dashboard', label: 'Dashboard' },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="logo-link shrink-0">
          <Image
            src="/logo.png"
            alt="Arke"
            width={88}
            height={46}
            className="logo-img"
            priority
          />
        </Link>

        {/* Right nav — desktop */}
        <div className="hidden md:flex items-center gap-1">
          <nav className="flex items-center gap-7 mr-4">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: 'var(--foreground)' }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 h-9 px-2.5 rounded-lg text-sm transition-opacity hover:opacity-60"
              style={{ color: 'var(--muted-text)' }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold">
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
                    style={{ color: lang.code === currentLang ? '#FF4F00' : 'var(--foreground)' }}>
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
            style={{ backgroundColor: '#FF4F00' }}>
            Dashboard
          </Link>
        </div>

        {/* Mobile right — theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9 flex items-center justify-center rounded-lg transition-opacity hover:opacity-60"
            style={{ color: 'var(--muted-text)' }}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="h-9 w-9 flex items-center justify-center rounded-lg transition-opacity hover:opacity-60"
            style={{ color: 'var(--foreground)' }}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
        >
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium py-3 border-b transition-opacity hover:opacity-60"
                style={{ color: 'var(--foreground)', borderColor: 'var(--border)' }}>
                {l.label}
              </Link>
            ))}
            <Link href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="mt-3 h-11 rounded-full text-sm font-bold text-white flex items-center justify-center transition-opacity hover:opacity-88"
              style={{ backgroundColor: '#FF4F00' }}>
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
