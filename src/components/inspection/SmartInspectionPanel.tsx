import { useEffect, useRef, useState } from 'react'
import { Camera, Video, Square, Zap, ZapOff, Timer, Sparkles, ScanEye } from 'lucide-react'
import AIFindingCard from '../ai/AIFindingCard'
import type { AIFinding } from '../../types'

const findingPool: Omit<AIFinding, 'id' | 'sourceId' | 'reviewStatus'>[] = [
  {
    room: 'غرفة المعيشة',
    detectedObjects: ['مكيف سبليت', 'نافذة', 'إضاءة سقفية', 'أرضية سيراميك', 'أريكة'],
    condition: 'جيدة',
    note: 'توجد علامة تلف بسيطة في الجدار.',
    confidence: 94,
  },
  {
    room: 'المطبخ',
    detectedObjects: ['خزائن', 'موقد', 'شفاط', 'أرضية بورسلان'],
    condition: 'جيدة',
    note: 'لا توجد ملاحظات تُذكر.',
    confidence: 97,
  },
  {
    room: 'الحمام',
    detectedObjects: ['مغسلة', 'مرآة', 'سخان مياه'],
    condition: 'مقبولة',
    note: 'المكيف يعمل بكفاءة جيدة.',
    confidence: 91,
  },
  {
    room: 'غرفة النوم',
    detectedObjects: ['خزانة ملابس', 'نافذة مزدوجة', 'أرضية باركيه'],
    condition: 'جيدة',
    note: 'رصد تسرب طفيف قرب النافذة.',
    confidence: 88,
  },
]

type Phase = 'idle' | 'analyzing' | 'done'

export default function SmartInspectionPanel({ onFindingApproved }: { onFindingApproved: (f: AIFinding) => void }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [recording, setRecording] = useState(false)
  const [flash, setFlash] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [captureCount, setCaptureCount] = useState(0)
  const [currentFinding, setCurrentFinding] = useState<AIFinding | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (recording) {
      timerRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    } else if (timerRef.current) {
      window.clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [recording])

  const format = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const capture = () => {
    if (phase === 'analyzing') return
    setPhase('analyzing')
    setCurrentFinding(null)
    const pick = findingPool[captureCount % findingPool.length]
    const nextCount = captureCount + 1
    setTimeout(() => {
      const finding: AIFinding = {
        ...pick,
        id: `F-live-${nextCount}`,
        sourceId: `SRC-${String(10 + nextCount).padStart(2, '0')}`,
        reviewStatus: 'نتيجة أولية',
      }
      setCurrentFinding(finding)
      setCaptureCount(nextCount)
      setPhase('done')
    }, 1600)
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
      {/* Camera area */}
      <div className="card relative flex aspect-video flex-col items-center justify-center overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(21,92,112,0.35),rgba(17,17,17,0.95))]" />
        <ScanEye size={56} strokeWidth={1} className="relative z-10 text-white/25" />
        <p className="relative z-10 mt-3 text-sm text-white/50">معاينة الكاميرا (محاكاة)</p>

        {recording && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-error/90 px-3 py-1 text-xs font-semibold">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            {format(seconds)}
          </div>
        )}

        <div className="absolute top-4 left-4 z-10">
          <span className="badge bg-white/10 text-white backdrop-blur">المعاينة قيد التنفيذ</span>
        </div>

        {phase === 'analyzing' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-ink/70 backdrop-blur-sm">
            <Sparkles size={30} className="animate-pulse text-primary" />
            <p className="text-sm font-medium text-white">جاري تحليل الصورة...</p>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-center gap-4 bg-gradient-to-t from-black/70 to-transparent p-5">
          <button
            title="الفلاش"
            onClick={() => setFlash((f) => !f)}
            className="rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
          >
            {flash ? <Zap size={18} /> : <ZapOff size={18} />}
          </button>

          <button
            title="التقاط صورة"
            onClick={capture}
            className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/80 bg-white/10 text-white hover:bg-white/20"
          >
            <Camera size={24} />
          </button>

          <button
            title={recording ? 'إيقاف التسجيل' : 'بدء التسجيل'}
            onClick={() => setRecording((r) => !r)}
            className={`rounded-full p-2.5 text-white hover:opacity-90 ${recording ? 'bg-error' : 'bg-white/10 hover:bg-white/20'}`}
          >
            {recording ? <Square size={18} /> : <Video size={18} />}
          </button>

          <button title="المؤقت" className="rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20">
            <Timer size={18} />
          </button>
        </div>
      </div>

      {/* Assistant panel */}
      <div className="min-w-0">
        {phase === 'idle' && (
          <div className="card flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
            <Sparkles size={26} className="text-primary/50" />
            <p className="text-sm font-medium text-ink/50">التقط صورة لبدء التحليل الذكي</p>
            <p className="text-xs text-ink/35">سيقوم AI بتحديد الغرفة والعناصر والحالة الظاهرة تلقائيًا</p>
          </div>
        )}
        {phase === 'analyzing' && (
          <div className="card flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
            <p className="text-sm font-medium text-ink/60">جاري تحليل الصورة...</p>
          </div>
        )}
        {phase === 'done' && currentFinding && (
          <div className="space-y-3">
            <div className="badge bg-success/10 text-success">تم تحليل الصورة ✓</div>
            <AIFindingCard
              finding={currentFinding}
              onApprove={() => {
                const approved = { ...currentFinding, reviewStatus: 'معتمدة' as const }
                setCurrentFinding(approved)
                onFindingApproved(approved)
              }}
              onEdit={(note) => {
                const edited = { ...currentFinding, note, reviewStatus: 'معدّلة' as const }
                setCurrentFinding(edited)
                onFindingApproved(edited)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
