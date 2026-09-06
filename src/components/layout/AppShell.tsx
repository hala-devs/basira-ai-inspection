import { useState, type ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AppShell({ children, title, subtitle }: { children: ReactNode; title?: string; subtitle?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-bg" dir="rtl">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenu={() => setOpen(true)} title={title} subtitle={subtitle} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
