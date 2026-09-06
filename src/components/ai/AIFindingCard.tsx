import { useState } from 'react'
import { CheckCircle2, Pencil, ImageIcon, Sparkles } from 'lucide-react'
import ConfidenceBar from '../ui/ConfidenceBar'
import type { AIFinding } from '../../types'

export default function AIFindingCard({
  finding,
  onApprove,
  onEdit,
  onViewSource,
}: {
  finding: AIFinding
  onApprove?: () => void
  onEdit?: (note: string) => void
  onViewSource?: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [note, setNote] = useState(finding.note)

  const approved = finding.reviewStatus === 'معتمدة'
  const edited = finding.reviewStatus === 'معدّلة'

  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="badge bg-primary/10 text-primary">
          <Sparkles size={13} />
          اقتراح من AI
        </span>
        {approved && (
          <span className="badge bg-success/10 text-success">
            <CheckCircle2 size={13} />
            معتمدة
          </span>
        )}
        {edited && <span className="badge bg-warning/10 text-warning">معدّلة</span>}
      </div>

      <h4 className="text-base font-bold text-ink">{finding.room}</h4>

      <div className="mt-3">
        <p className="mb-1.5 text-xs font-medium text-ink/50">العناصر المكتشفة</p>
        <div className="flex flex-wrap gap-1.5">
          {finding.detectedObjects.map((o) => (
            <span key={o} className="rounded-full bg-black/[0.04] px-2.5 py-1 text-xs text-ink/70">{o}</span>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-medium text-ink/50">الحالة الظاهرة</p>
          <p className="mt-1 text-sm font-semibold text-ink">{finding.condition}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-ink/50">درجة الثقة</p>
          <div className="mt-1.5">
            <ConfidenceBar value={finding.confidence} />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs font-medium text-ink/50">ملاحظة</p>
        {editing ? (
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="input mt-1.5 text-sm"
            rows={2}
          />
        ) : (
          <p className="mt-1 text-sm leading-relaxed text-ink/75">{note}</p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-4">
        <button onClick={onViewSource} className="flex items-center gap-1.5 text-xs font-medium text-ink/50 hover:text-primary">
          <ImageIcon size={14} />
          المصدر: {finding.sourceId.replace('SRC-', 'صورة #')}
        </button>

        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={() => {
                  setEditing(false)
                  onEdit?.(note)
                }}
                className="btn-primary px-3 py-1.5 text-xs"
              >
                حفظ التعديل
              </button>
              <button onClick={() => setEditing(false)} className="btn-secondary px-3 py-1.5 text-xs">
                إلغاء
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)} className="btn-secondary px-3 py-1.5 text-xs">
                <Pencil size={13} />
                تعديل
              </button>
              <button onClick={onApprove} disabled={approved} className="btn-primary px-3 py-1.5 text-xs">
                <CheckCircle2 size={13} />
                اعتماد النتيجة
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
