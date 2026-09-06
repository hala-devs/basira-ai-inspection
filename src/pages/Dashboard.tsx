import { useNavigate } from 'react-router-dom'
import { Plus, ClipboardList, ShieldCheck, CheckCircle2, Timer } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import StatCard from '../components/dashboard/StatCard'
import ActivityChart from '../components/dashboard/ActivityChart'
import InspectionsTable from '../components/inspections/InspectionsTable'
import { mockInspections } from '../data/mockInspections'

export default function Dashboard() {
  const navigate = useNavigate()
  const recent = mockInspections.slice(0, 6)

  return (
    <AppShell title="الرئيسية">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-extrabold text-ink">مرحبًا، أحمد 👋</h2>
          <p className="mt-1 text-sm text-ink/50">إليك ملخص أعمال المعاينة اليوم.</p>
        </div>
        <button onClick={() => navigate('/inspections/new')} className="btn-primary self-start sm:self-auto">
          <Plus size={18} />
          معاينة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={ClipboardList} value="24" label="معاينة اليوم" tone="primary" />
        <StatCard icon={ShieldCheck} value="6" label="بانتظار المراجعة" tone="warning" />
        <StatCard icon={CheckCircle2} value="18" label="معاينة مكتملة" tone="success" />
        <StatCard icon={Timer} value="32 دقيقة" label="متوسط زمن المعاينة" tone="muted" />
      </div>

      <div className="mt-6">
        <ActivityChart />
      </div>

      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-ink">أحدث المعاينات</h3>
          <button onClick={() => navigate('/inspections')} className="text-sm font-medium text-primary hover:underline">
            عرض الكل
          </button>
        </div>
        <InspectionsTable inspections={recent} />
      </div>
    </AppShell>
  )
}
