import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import type { Inspection } from '../../types'
import Badge, { statusTone } from '../ui/Badge'

export default function InspectionsTable({ inspections }: { inspections: Inspection[] }) {
  const navigate = useNavigate()

  const goTo = (insp: Inspection) => {
    if (insp.status === 'مكتملة') navigate(`/inspections/${insp.id}/documentation`)
    else if (insp.status === 'قيد المراجعة') navigate('/reviewer')
    else navigate('/inspections/new')
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-black/[0.06] bg-black/[0.015] text-ink/50">
              <th className="px-4 py-3 text-start font-medium">رقم المعاينة</th>
              <th className="px-4 py-3 text-start font-medium">الأصل</th>
              <th className="px-4 py-3 text-start font-medium">الموقع</th>
              <th className="px-4 py-3 text-start font-medium">المعاين</th>
              <th className="px-4 py-3 text-start font-medium">الحالة</th>
              <th className="px-4 py-3 text-start font-medium">التاريخ</th>
              <th className="px-4 py-3 text-start font-medium">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((insp) => (
              <tr key={insp.id} className="border-b border-black/[0.05] last:border-0 hover:bg-black/[0.015]">
                <td className="px-4 py-3.5 font-medium text-ink/80">{insp.id}</td>
                <td className="px-4 py-3.5 text-ink/70">{insp.assetName}</td>
                <td className="px-4 py-3.5 text-ink/60">{insp.location}</td>
                <td className="px-4 py-3.5 text-ink/60">{insp.inspectorName}</td>
                <td className="px-4 py-3.5">
                  <Badge tone={statusTone(insp.status)}>{insp.status}</Badge>
                </td>
                <td className="px-4 py-3.5 text-ink/50 tabular-nums">{insp.date}</td>
                <td className="px-4 py-3.5">
                  <button
                    onClick={() => goTo(insp)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    عرض
                    <ChevronLeft size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
