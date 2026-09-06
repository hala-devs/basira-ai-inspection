import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ImageIcon, PlayCircle, CheckCircle2, ExternalLink, ArrowRight } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import { getInspectionById } from '../data/mockInspections'

const timelineEvents = [
  { time: '00:13', room: 'غرفة المعيشة' },
  { time: '00:27', room: 'المطبخ' },
  { time: '00:41', room: 'الحمام' },
]

export default function Documentation() {
  const { id } = useParams()
  const navigate = useNavigate()
  const inspection = getInspectionById(id ?? '') ?? getInspectionById('INSP-3001')
  const [activeSource, setActiveSource] = useState(inspection?.sources[0]?.id ?? null)
  const [activeTime, setActiveTime] = useState(timelineEvents[0].time)

  return (
    <AppShell title="توثيق المعاينة" subtitle={inspection ? `${inspection.assetName} — ${inspection.location}` : undefined}>
      <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-1.5 text-sm font-medium text-ink/50 hover:text-primary">
        <ArrowRight size={15} />
        رجوع
      </button>

      <h2 className="mb-4 text-base font-bold text-ink">شبكة الصور الموثّقة</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {inspection?.sources.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSource(s.id)}
            className={`card overflow-hidden text-start transition-shadow ${activeSource === s.id ? 'ring-2 ring-primary' : ''}`}
          >
            <div className="flex aspect-square items-center justify-center bg-ink/95 text-white/30">
              <ImageIcon size={28} />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-ink">{s.label}</span>
                <span className="text-xs text-ink/40 tabular-nums">{s.timestamp}</span>
              </div>
              <p className="mt-1 text-xs text-ink/50">{s.room}</p>
              <span className="badge mt-2 bg-success/10 text-success">
                <CheckCircle2 size={11} />
                تم التحليل
              </span>
            </div>
          </button>
        ))}
      </div>

      <h2 className="mb-4 mt-10 text-base font-bold text-ink">مقطع فيديو المعاينة (محاكاة)</h2>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="card relative flex aspect-video items-center justify-center bg-ink text-white/40">
          <PlayCircle size={44} strokeWidth={1.25} />
          <span className="absolute bottom-4 right-4 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">{activeTime}</span>
        </div>

        <div className="card p-4">
          <p className="mb-3 text-xs font-semibold text-ink/50">أحداث الفيديو</p>
          <div className="space-y-1">
            {timelineEvents.map((e) => (
              <button
                key={e.time}
                onClick={() => setActiveTime(e.time)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors ${
                  activeTime === e.time ? 'bg-primary-light text-primary font-semibold' : 'text-ink/70 hover:bg-black/[0.03]'
                }`}
              >
                <span>{e.room}</span>
                <span className="tabular-nums text-xs">{e.time}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 border-t border-black/[0.06] pt-4">
            <p className="mb-2 text-xs font-semibold text-ink/50">مصدر البيانات</p>
            <button className="btn-secondary w-full text-sm">
              <ExternalLink size={14} />
              عرض المصدر
            </button>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-ink/40">
        كل نتيجة تحليل مرتبطة بمصدرها الأصلي من الصور أو الفيديو، ويمكن الرجوع إليه في أي وقت للتحقق قبل اعتماد التقرير النهائي.
      </p>
    </AppShell>
  )
}
