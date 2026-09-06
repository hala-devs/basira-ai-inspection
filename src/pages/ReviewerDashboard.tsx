import { useState } from 'react'
import { ImageIcon, X } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import ConfidenceBar from '../components/ui/ConfidenceBar'
import AIFindingCard from '../components/ai/AIFindingCard'
import { mockInspections } from '../data/mockInspections'
import type { Inspection } from '../types'

export default function ReviewerDashboard() {
  const [role, setRole] = useState<'معاين' | 'مراجع'>('مراجع')
  const [active, setActive] = useState<Inspection | null>(null)

  const pending = mockInspections.filter((i) => i.status === 'قيد المراجعة')

  return (
    <AppShell title="المراجعات" subtitle="راجع نتائج AI واعتمد البيانات قبل إصدار التقرير.">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-md border border-black/10 bg-white p-1">
          {(['معاين', 'مراجع'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
                role === r ? 'bg-primary text-white' : 'text-ink/60 hover:bg-black/[0.04]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <span className="badge bg-warning/10 text-warning">{pending.length} معاينات بانتظار المراجعة</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pending.map((insp) => {
          const finding = insp.findings[0]
          return (
            <div key={insp.id} className="card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-ink">{insp.assetName}</h3>
                <span className="text-xs text-ink/40">{insp.id}</span>
              </div>
              <p className="mt-0.5 text-sm text-ink/50">{insp.location}</p>
              <p className="mt-2 text-xs text-ink/45">المعاين: {insp.inspectorName}</p>

              {finding && (
                <>
                  <div className="mt-3">
                    <p className="mb-1 text-xs text-ink/40">درجة ثقة AI</p>
                    <ConfidenceBar value={finding.confidence} />
                  </div>
                  <p className="mt-2 text-xs text-ink/45">{insp.findings.length} نتيجة موثقة • مصدر: {finding.sourceId.replace('SRC-', 'صورة #')}</p>
                </>
              )}

              <div className="mt-4 flex gap-2 border-t border-black/[0.06] pt-4">
                <button onClick={() => setActive(insp)} className="btn-secondary flex-1 text-xs">
                  مراجعة
                </button>
                <button className="btn-primary flex-1 text-xs">اعتماد</button>
              </div>
              <button className="mt-2 w-full text-xs font-medium text-error/70 hover:underline">إرجاع للتعديل</button>
            </div>
          )
        })}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setActive(null)}>
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">{active.assetName} — {active.location}</h3>
              <button onClick={() => setActive(null)} className="rounded-md p-1.5 text-ink/40 hover:bg-black/5">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5">
              {active.findings.map((f) => (
                <div key={f.id} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="card flex aspect-video items-center justify-center bg-ink text-white/40">
                    <div className="text-center">
                      <ImageIcon size={28} className="mx-auto mb-2" />
                      <span className="text-xs">{f.sourceId.replace('SRC-', 'صورة #')} — المصدر الأصلي</span>
                    </div>
                  </div>
                  <AIFindingCard finding={f} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  )
}
