import { useNavigate } from 'react-router-dom'
import { FileText, ChevronLeft } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import Badge, { statusTone } from '../components/ui/Badge'
import { mockReports } from '../data/mockReports'

export default function Reports() {
  const navigate = useNavigate()
  return (
    <AppShell title="التقارير" subtitle="تقارير المعاينة المكتملة والمعتمدة.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockReports.map((r) => (
          <button
            key={r.id}
            onClick={() => navigate(`/reports/${r.id}`)}
            className="card flex flex-col items-start gap-3 p-5 text-start hover:border-primary/30"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-light text-primary">
                <FileText size={18} />
              </div>
              <Badge tone={statusTone(r.status)}>{r.status}</Badge>
            </div>
            <div>
              <h3 className="font-bold text-ink">{r.assetName}</h3>
              <p className="mt-0.5 text-sm text-ink/50">{r.location}</p>
            </div>
            <div className="flex w-full items-center justify-between border-t border-black/[0.06] pt-3 text-xs text-ink/45">
              <span>اعتمد بواسطة {r.approvedBy}</span>
              <span className="flex items-center gap-1 font-medium text-primary">
                عرض
                <ChevronLeft size={13} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </AppShell>
  )
}
