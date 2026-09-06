import { useState } from 'react'
import { User, Shield, Bell, Lock } from 'lucide-react'
import AppShell from '../components/layout/AppShell'

const tabs = [
  { id: 'profile', label: 'الملف الشخصي', icon: User },
  { id: 'account', label: 'إعدادات الحساب', icon: Shield },
  { id: 'notifications', label: 'الإشعارات', icon: Bell },
  { id: 'security', label: 'الأمان', icon: Lock },
] as const

export default function Settings() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('profile')

  return (
    <AppShell title="الإعدادات">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="card h-fit space-y-1 p-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                tab === t.id ? 'bg-primary-light text-primary' : 'text-ink/60 hover:bg-black/[0.04]'
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </nav>

        <div className="card p-6">
          {tab === 'profile' && (
            <div className="max-w-md space-y-4">
              <h2 className="mb-4 text-base font-bold text-ink">الملف الشخصي</h2>
              <div>
                <label className="label" htmlFor="name">الاسم الكامل</label>
                <input id="name" defaultValue="أحمد العتيبي" className="input" />
              </div>
              <div>
                <label className="label" htmlFor="role">الدور الوظيفي</label>
                <input id="role" defaultValue="معاين أول" className="input" />
              </div>
              <div>
                <label className="label" htmlFor="email2">البريد الإلكتروني</label>
                <input id="email2" defaultValue="ahmed@smartinspector.sa" className="input" />
              </div>
              <button className="btn-primary">حفظ التغييرات</button>
            </div>
          )}

          {tab === 'account' && (
            <div className="max-w-md space-y-4">
              <h2 className="mb-4 text-base font-bold text-ink">إعدادات الحساب</h2>
              <div>
                <label className="label" htmlFor="lang">اللغة</label>
                <select id="lang" className="input" defaultValue="ar">
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="label" htmlFor="region">المنطقة</label>
                <select id="region" className="input" defaultValue="riyadh">
                  <option value="riyadh">الرياض</option>
                  <option value="jeddah">جدة</option>
                  <option value="dammam">الدمام</option>
                </select>
              </div>
              <button className="btn-primary">حفظ</button>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="max-w-md space-y-3">
              <h2 className="mb-4 text-base font-bold text-ink">تفضيلات الإشعارات</h2>
              {['إشعارات المراجعة الجديدة', 'إشعارات اكتمال التقارير', 'إشعارات تحليل AI'].map((n) => (
                <label key={n} className="flex items-center justify-between rounded-md border border-black/[0.06] px-4 py-3 text-sm">
                  {n}
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                </label>
              ))}
            </div>
          )}

          {tab === 'security' && (
            <div className="max-w-md space-y-4">
              <h2 className="mb-4 text-base font-bold text-ink">الأمان</h2>
              <div>
                <label className="label" htmlFor="cur">كلمة المرور الحالية</label>
                <input id="cur" type="password" className="input" />
              </div>
              <div>
                <label className="label" htmlFor="new">كلمة المرور الجديدة</label>
                <input id="new" type="password" className="input" />
              </div>
              <button className="btn-primary">تحديث كلمة المرور</button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
