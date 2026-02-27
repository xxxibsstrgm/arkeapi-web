'use client'

import { DashboardProvider } from '@/lib/dashboard-context'
import { DashboardSidebar } from '@/components/dashboard/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <div className="min-h-screen flex">
        <DashboardSidebar />
        {/* Main content — offset by sidebar width */}
        <main className="flex-1 ml-60 min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
          {children}
        </main>
      </div>
    </DashboardProvider>
  )
}
