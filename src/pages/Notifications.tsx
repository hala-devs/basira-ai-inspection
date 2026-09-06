import { BrainCircuit, ShieldCheck, FileCheck2, ClipboardList } from 'lucide-react'
import AppShell from '../components/layout/AppShell'

const notifications = [
  { icon: BrainCircuit, title: 'اكتمل تحليل AI للمعاينة INSP-3003', time: 'قبل 10 دقائق', tone: 'primary' },
  { icon: ShieldCheck, title: 'معاينة INSP-3002 بانتظار مراجعتك', time: 'قبل 32 دقيقة', tone: 'warning' },
  { icon: FileCheck2, title: 'تم اعتماد تقرير المعاينة INSP-3001', time: 'قبل ساعتين', tone: 'success' },
  { icon: ClipboardList, title: 'تم إنشاء معاينة جديدة للأصل AST-1004', time: 'أمس', tone: 'muted' },
] as const

const toneClasses = {
  primary: 'bg-primary-light text-primary',
  warning: 'bg-warning/10 text-warning',
  success: 'bg-success/10 text-success',
  muted: 'bg-secondary/10 text-secondary',
}

export default function Notifications() {
  return (
    <AppShell title="الإشعارات" subtitle="آخر التحديثات المتعلقة بأعمال المعاينة.">
      <div className="card divide-y divide-black/[0.05]">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${toneClasses[n.tone]}`}>
              <n.icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink">{n.title}</p>
              <p className="mt-0.5 text-xs text-ink/40">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
