import { Menu, Search, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header({ onMenu, title, subtitle }: { onMenu: () => void; title?: string; subtitle?: string }) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-black/[0.06] bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <button className="rounded-md p-2 text-ink/60 hover:bg-black/5 lg:hidden" onClick={onMenu} aria-label="فتح القائمة">
        <Menu size={20} />
      </button>

      {title ? (
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[17px] font-bold text-ink">{title}</h1>
          {subtitle && <p className="truncate text-xs text-ink/50">{subtitle}</p>}
        </div>
      ) : (
        <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-md border border-black/10 bg-bg px-3 py-2 sm:flex">
          <Search size={16} className="text-ink/40" />
          <input placeholder="بحث سريع..." className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40" />
        </div>
      )}

      <div className="ms-auto flex items-center gap-3">
        <button
          onClick={() => navigate('/notifications')}
          className="relative rounded-md p-2 text-ink/60 hover:bg-black/5"
          aria-label="الإشعارات"
        >
          <Bell size={19} />
          <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-error" />
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
        >
          أ
        </button>
      </div>
    </header>
  )
}
