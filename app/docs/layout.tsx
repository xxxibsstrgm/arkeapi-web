import Link from 'next/link'
import Image from 'next/image'
import { DocsNav } from '@/components/docs/docs-nav'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left sidebar */}
      <aside
        className="fixed top-0 left-0 h-screen w-56 flex flex-col border-r overflow-y-auto z-30"
        style={{ borderColor: 'var(--border)' }}
      >
        {/* Logo */}
        <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
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
        </div>

        <DocsNav />

        <div className="mt-auto px-5 py-5 border-t" style={{ borderColor: 'var(--border)' }}>
          <a
            href="mailto:support@arkeapi.com"
            className="text-xs hover:opacity-70 transition-opacity"
            style={{ color: 'var(--muted-text)' }}
          >
            support@arkeapi.com
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-56 px-10 py-14">
        {children}
      </main>
    </div>
  )
}
