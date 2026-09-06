import { useParams, useNavigate } from 'react-router-dom'
import { ArrowRight, ClipboardCheck, BrainCircuit, ShieldCheck, FileCheck2, Plus } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import AssetThumb from '../components/ui/AssetThumb'
import Badge, { statusTone } from '../components/ui/Badge'
import { getAssetById, mockAssets } from '../data/mockAssets'
import { mockInspections } from '../data/mockInspections'
import InspectionsTable from '../components/inspections/InspectionsTable'

const historyIcons = [ClipboardCheck, BrainCircuit, ShieldCheck, FileCheck2]

const history = [
  { date: '12 سبتمبر', label: 'تم إنشاء المعاينة' },
  { date: '12 سبتمبر', label: 'تم تحليل البيانات' },
  { date: '12 سبتمبر', label: 'تمت المراجعة' },
  { date: '12 سبتمبر', label: 'تم اعتماد التقرير' },
]

export default function AssetDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const asset = getAssetById(id ?? '') ?? mockAssets[0]
  const related = mockInspections.filter((i) => i.assetId === asset.id)

  return (
    <AppShell title="تفاصيل الأصل">
      <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-1.5 text-sm font-medium text-ink/50 hover:text-primary">
        <ArrowRight size={15} />
        رجوع
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="card p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <AssetThumb image={asset.image} className="h-14 w-14" />
              <div>
                <h2 className="text-lg font-extrabold text-ink">{asset.name}</h2>
                <p className="mt-0.5 text-sm text-ink/50">{asset.city}، {asset.district}</p>
              </div>
            </div>
            <Badge tone={statusTone(asset.status)}>{asset.status}</Badge>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'النوع', value: asset.type },
              { label: 'المساحة', value: `${asset.area} م²` },
              { label: 'الغرف', value: `${asset.rooms}` },
              { label: 'آخر معاينة', value: asset.lastInspectionDate ?? '—' },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-xs text-ink/40">{f.label}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{f.value}</p>
              </div>
            ))}
          </div>

          <button onClick={() => navigate('/inspections/new')} className="btn-primary mt-6">
            <Plus size={16} />
            معاينة جديدة لهذا الأصل
          </button>
        </div>

        <div className="card p-6">
          <h3 className="mb-4 text-sm font-bold text-ink">سجل المعاينة</h3>
          <div className="space-y-5">
            {history.map((h, i) => {
              const Icon = historyIcons[i]
              return (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                      <Icon size={15} />
                    </div>
                    {i < history.length - 1 && <div className="mt-1 w-px flex-1 bg-black/10" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-semibold text-ink">{h.label}</p>
                    <p className="text-xs text-ink/40">{h.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-base font-bold text-ink">المعاينات المرتبطة</h3>
          <InspectionsTable inspections={related} />
        </div>
      )}
    </AppShell>
  )
}
