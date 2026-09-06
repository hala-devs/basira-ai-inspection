import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, CheckCircle2, ArrowLeft, ArrowRight, LayoutGrid, ImageIcon, Loader2, FileCheck2 } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import WizardProgress from '../components/inspection/WizardProgress'
import SmartInspectionPanel from '../components/inspection/SmartInspectionPanel'
import AIFindingCard from '../components/ai/AIFindingCard'
import AssetThumb from '../components/ui/AssetThumb'
import { mockAssets } from '../data/mockAssets'
import type { Asset, AIFinding } from '../types'

const templateSections = ['الواجهات', 'الأعمال الداخلية', 'الغرف', 'الأنظمة', 'المرافق', 'المعدات']

export default function NewInspection() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [query, setQuery] = useState('')
  const [asset, setAsset] = useState<Asset | null>(null)
  const [findings, setFindings] = useState<AIFinding[]>([])
  const [reportPhase, setReportPhase] = useState(0)

  const filteredAssets = mockAssets.filter(
    (a) => !query || a.name.includes(query) || a.district.includes(query) || a.city.includes(query) || a.id.includes(query),
  )

  const next = () => setStep((s) => Math.min(5, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))

  const upsertFinding = (f: AIFinding) => {
    setFindings((prev) => {
      const exists = prev.find((p) => p.id === f.id)
      if (exists) return prev.map((p) => (p.id === f.id ? f : p))
      return [...prev, f]
    })
  }

  const startReportGeneration = () => {
    next()
    setReportPhase(1)
    const steps = [1, 2, 3, 4]
    steps.forEach((s, i) => setTimeout(() => setReportPhase(s), (i + 1) * 900))
  }

  return (
    <AppShell title="معاينة جديدة">
      <div className="mx-auto max-w-5xl">
        <WizardProgress current={step} />

        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold text-ink">تحديد الأصل</h2>
            <p className="mt-1 text-sm text-ink/50">اختر الأصل المراد معاينته من القائمة أدناه.</p>

            <div className="relative mt-5 max-w-md">
              <Search size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث برقم الأصل أو الموقع"
                className="input"
                style={{ paddingRight: '2.25rem' }}
              />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filteredAssets.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAsset(a)}
                  className={`card flex items-start gap-3 p-4 text-start transition-colors ${
                    asset?.id === a.id ? 'border-primary ring-1 ring-primary' : 'hover:border-primary/30'
                  }`}
                >
                  <AssetThumb image={a.image} className="h-12 w-12" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-ink">{a.name}</h3>
                      {asset?.id === a.id && <CheckCircle2 size={18} className="text-primary" />}
                    </div>
                    <p className="mt-0.5 text-sm text-ink/50">{a.city}، {a.district}</p>
                    <p className="mt-1 text-xs text-ink/40">{a.area} م² • {a.rooms} غرف • {a.type}</p>
                  </div>
                </button>
              ))}
            </div>

            {asset && (
              <div className="mt-5 flex items-center gap-2 rounded-md border border-success/20 bg-success/5 px-4 py-3 text-sm font-medium text-success">
                <CheckCircle2 size={16} />
                تم التحقق من بيانات الأصل ✓
              </div>
            )}
            <p className="mt-3 text-xs leading-relaxed text-ink/35">
              في النسخة الفعلية، يمكن ربط هذه الخطوة مع الهيئة العامة للمساحة والمعلومات الجغرافية للتحقق التلقائي من بيانات الأصل. (غير مفعّل في هذا النموذج التجريبي)
            </p>

            <div className="mt-8 flex justify-end">
              <button disabled={!asset} onClick={next} className="btn-primary">
                التالي
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold text-ink">نموذج المعاينة</h2>
            <div className="mt-3 flex items-center gap-2 rounded-md border border-primary/15 bg-primary-light px-4 py-3 text-sm font-medium text-primary-dark">
              <CheckCircle2 size={16} />
              تم تحديد نموذج المعاينة تلقائيًا بناءً على نوع الأصل ({asset?.type ?? '—'}).
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {templateSections.map((s) => (
                <div key={s} className="card flex items-center gap-2.5 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-light text-primary">
                    <LayoutGrid size={16} />
                  </div>
                  <span className="text-sm font-semibold text-ink">{s}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={back} className="btn-secondary">
                <ArrowRight size={16} />
                السابق
              </button>
              <button onClick={next} className="btn-primary">
                بدء المعاينة
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-ink">المعاينة الذكية</h2>
                <p className="mt-1 text-sm text-ink/50">{asset?.name} — {asset?.city}، {asset?.district}</p>
              </div>
              <span className="badge bg-primary/10 text-primary">
                <ImageIcon size={13} />
                {findings.length} نتيجة موثّقة
              </span>
            </div>

            <SmartInspectionPanel onFindingApproved={upsertFinding} />

            <div className="mt-8 flex justify-between">
              <button onClick={back} className="btn-secondary">
                <ArrowRight size={16} />
                السابق
              </button>
              <button disabled={findings.length === 0} onClick={next} className="btn-primary">
                متابعة إلى المراجعة
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-bold text-ink">المراجعة</h2>
            <p className="mt-1 text-sm text-ink/50">
              يمكنك الرجوع إلى المصدر الأصلي للتحقق من النتيجة قبل اعتمادها.
            </p>

            <div className="mt-5 space-y-4">
              {findings.map((f) => (
                <div key={f.id} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="card flex aspect-video items-center justify-center bg-ink text-white/40">
                    <div className="text-center">
                      <ImageIcon size={28} className="mx-auto mb-2" />
                      <span className="text-xs">{f.sourceId.replace('SRC-', 'صورة #')} — المصدر الأصلي</span>
                    </div>
                  </div>
                  <AIFindingCard
                    finding={f}
                    onApprove={() => upsertFinding({ ...f, reviewStatus: 'معتمدة' })}
                    onEdit={(note) => upsertFinding({ ...f, note, reviewStatus: 'معدّلة' })}
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={back} className="btn-secondary">
                <ArrowRight size={16} />
                السابق
              </button>
              <button onClick={startReportGeneration} className="btn-primary">
                إنشاء التقرير
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center py-10 text-center">
            {reportPhase < 4 ? (
              <>
                <Loader2 size={32} className="mb-6 animate-spin text-primary" />
                <div className="w-full max-w-sm space-y-3 text-start">
                  {[
                    'جمع بيانات المعاينة',
                    'تحليل النتائج',
                    'مراجعة البيانات',
                    'إنشاء التقرير',
                  ].map((label, i) => (
                    <div key={label} className="flex items-center gap-3 text-sm">
                      {reportPhase > i ? (
                        <CheckCircle2 size={18} className="text-success" />
                      ) : reportPhase === i ? (
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
                      ) : (
                        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                      )}
                      <span className={reportPhase > i ? 'text-ink/40 line-through' : 'text-ink/80'}>{label}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                  <FileCheck2 size={30} />
                </div>
                <h2 className="text-xl font-extrabold text-ink">تم إنشاء التقرير بنجاح</h2>
                <p className="mt-2 max-w-sm text-sm text-ink/50">
                  تم توثيق {findings.length} نتيجة بالذكاء الاصطناعي وربطها بمصادرها الأصلية.
                </p>
                <button onClick={() => navigate('/reports/RPT-9001')} className="btn-primary mt-6">
                  عرض التقرير
                  <ArrowLeft size={16} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </AppShell>
  )
}
