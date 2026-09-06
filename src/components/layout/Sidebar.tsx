import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardList,
  Boxes,
  FileText,
  BarChart3,
  ShieldCheck,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  X,
} from 'lucide-react'
import Logo from '../ui/Logo'

const navItems = [
  { to: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { to: '/inspections', label: 'المعاينات', icon: ClipboardList },
  { to: '/assets', label: 'الأصول', icon: Boxes },
  { to: '/reports', label: 'التقارير', icon: FileText },
  { to: '/analytics', label: 'التحليلات', icon: BarChart3 },
  { to: '/reviewer', label: 'المراجعات', icon: ShieldCheck },
  { to: '/notifications', label: 'الإشعارات', icon: Bell },
  { to: '/help', label: 'المساعدة', icon: HelpCircle },
]

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 right-0 z-40 flex w-64 flex-col border-l border-black/[0.06] bg-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Logo />
          <button className="rounded-md p-1 text-ink/50 hover:bg-black/5 lg:hidden" onClick={onClose} aria-label="إغلاق القائمة">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-light text-primary' : 'text-ink/70 hover:bg-black/[0.04]'
                }`
              }
            >
              <item.icon size={18} strokeWidth={1.75} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t border-black/[0.06] px-3 py-4">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-primary-light text-primary' : 'text-ink/70 hover:bg-black/[0.04]'
              }`
            }
          >
            <Settings size={18} strokeWidth={1.75} />
            الإعدادات
          </NavLink>
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-error/80 hover:bg-error/5"
          >
            <LogOut size={18} strokeWidth={1.75} />
            تسجيل الخروج
          </NavLink>
        </div>
      </aside>
    </>
  )
}
