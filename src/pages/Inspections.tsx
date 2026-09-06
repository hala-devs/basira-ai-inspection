import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import InspectionsTable from '../components/inspections/InspectionsTable'
import { mockInspections, mockInspectors } from '../data/mockInspections'
import type { InspectionStatus } from '../types'

const statuses: InspectionStatus[] = ['جديدة', 'قيد المعاينة', 'قيد تحليل AI', 'قيد المراجعة', 'مكتملة']

export default function Inspections() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<string>('الكل')
  const [inspector, setInspector] = useState<string>('الكل')

  const filtered = useMemo(() => {
    return mockInspections.filter((i) => {
      const matchesQuery =
        !query ||
        i.assetName.includes(query) ||
        i.id.includes(query) ||
        i.location.includes(query) ||
        i.inspectorName.includes(query)
      const matchesStatus = status === 'الكل' || i.status === status
      const matchesInspector = inspector === 'الكل' || i.inspectorName === inspector
      return matchesQuery && matchesStatus && matchesInspector
    })
  }, [query, status, inspector])

  return (
    <AppShell title="المعاينات" subtitle="إدارة ومتابعة جميع عمليات المعاينة.">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-sm">
          <Search size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث برقم المعاينة أو الأصل أو الموقع"
            className="input pe-3.5 ps-3"
            style={{ paddingRight: '2.25rem' }}
          />
        </div>
        <button onClick={() => navigate('/inspections/new')} className="btn-primary">
          <Plus size={18} />
          معاينة جديدة
        </button>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="input w-auto text-sm">
          <option value="الكل">كل الحالات</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select value={inspector} onChange={(e) => setInspector(e.target.value)} className="input w-auto text-sm">
          <option value="الكل">كل المعاينين</option>
          {mockInspectors.map((i) => (
            <option key={i.id} value={i.name}>{i.name}</option>
          ))}
        </select>
        <select className="input w-auto text-sm">
          <option>كل التواريخ</option>
          <option>اليوم</option>
          <option>هذا الأسبوع</option>
          <option>هذا الشهر</option>
        </select>
      </div>

      {filtered.length > 0 ? (
        <InspectionsTable inspections={filtered} />
      ) : (
        <div className="card flex flex-col items-center gap-2 p-14 text-center">
          <Search size={28} className="text-ink/20" />
          <p className="text-sm font-medium text-ink/50">لا توجد نتائج مطابقة لبحثك.</p>
        </div>
      )}
    </AppShell>
  )
}
