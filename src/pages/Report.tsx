import { useParams, useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, ImageIcon } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import Badge, { statusTone } from '../components/ui/Badge'
import { getReportById, mockReports } from '../data/mockReports'

export default function ReportPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const report = getReportById(id ?? '') ?? mockReports[0]

  return (
    <AppShell title="تقرير المعاينة" subtitle={`${report.assetName} — ${report.location}`}>
      <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-1.5 text-sm font-medium text-ink/50 hover:text-primary">
        <ArrowRight size={15} />
        رجوع
      </button>

      <div className="card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-ink">{report.assetName}</h2>
            <p className="mt-1 text-sm text-ink/50">{report.location}</p>
            <p className="mt-1 text-sm text-ink/50">المساحة: {report.area} م²</p>
          </div>
          <Badge tone={statusTone(report.status)}>{report.status}</Badge>
        </div>

        <div className="mt-5 rounded-md border border-success/15 bg-success/5 px-4 py-3">
          <p className="text-sm font-semibold text-success">الحالة العامة: {report.overallCondition}</p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-4">
          <div className="rounded-md border border-black/[0.06] p-4 text-center">
            <div className="text-2xl font-extrabold text-success">{report.goodCount}</div>
            <div className="mt-1 text-xs text-ink/50">حالة جيدة</div>
          </div>
          <div className="rounded-md border border-black/[0.06] p-4 text-center">
            <div className="text-2xl font-extrabold text-warning">{report.notesCount}</div>
            <div className="mt-1 text-xs text-ink/50">ملاحظات</div>
          </div>
          <div className="rounded-md border border-black/[0.06] p-4 text-center">
            <div className="text-2xl font-extrabold text-error">{report.criticalCount}</div>
            <div className="mt-1 text-xs text-ink/50">ملاحظة مهمة</div>
          </div>
        </div>
      </div>

      <div className="card mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-black/[0.06] bg-black/[0.015] text-ink/50">
                <th className="px-4 py-3 text-start font-medium">البند</th>
                <th className="px-4 py-3 text-start font-medium">الحالة</th>
                <th className="px-4 py-3 text-start font-medium">الملاحظة</th>
                <th className="px-4 py-3 text-start font-medium">المصدر</th>
              </tr>
            </thead>
            <tbody>
              {report.items.map((item, i) => (
                <tr key={i} className="border-b border-black/[0.05] last:border-0 hover:bg-black/[0.015]">
                  <td className="px-4 py-3.5 font-medium text-ink/80">{item.label}</td>
                  <td className="px-4 py-3.5">
                    <Badge tone={statusTone(item.status)}>{item.status}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-ink/60">{item.note}</td>
                  <td className="px-4 py-3.5">
                    <button className="inline-flex items-center gap-1 text-primary hover:underline">
                      <ImageIcon size={14} />
                      {item.sourceId.replace('SRC-', 'صورة #')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt-6 flex flex-wrap items-center gap-3 p-5">
        <ShieldCheck size={20} className="text-primary" />
        <p className="text-sm text-ink/70">
          تمت مراجعة النتائج واعتمادها من قبل المراجع <span className="font-semibold text-ink">{report.approvedBy}</span> بتاريخ{' '}
          <span className="tabular-nums">{report.approvedDate}</span>.
        </p>
      </div>

      {report.criticalCount > 0 && (
        <div className="mt-4 flex items-center gap-2 text-xs text-warning">
          <AlertTriangle size={14} />
          هذا التقرير يحتوي على ملاحظة مهمة تحتاج متابعة.
        </div>
      )}

      <div className="mt-6 flex items-center gap-2 text-xs text-success">
        <CheckCircle2 size={14} />
        جميع النتائج قابلة للتحقق من مصدرها الأصلي.
      </div>
    </AppShell>
  )
}
