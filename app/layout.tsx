import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ArkeAPI — Global High-Speed AI Gateway',
  description:
    'One API key to access GPT-4o, Claude, Gemini and more. Drop-in OpenAI-compatible. Fast, affordable, no rate limits.',
  metadataBase: new URL('https://arkeapi.com'),
  openGraph: {
    title: 'ArkeAPI — Global High-Speed AI Gateway',
    description: 'One API key. Access GPT-4o, Claude, Gemini and more.',
    url: 'https://arkeapi.com',
    siteName: 'ArkeAPI',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
