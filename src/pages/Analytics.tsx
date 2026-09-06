import { useState } from 'react'
import { ClipboardList, Timer, Database, BrainCircuit } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import StatCard from '../components/dashboard/StatCard'

const periodBars = [
  { label: 'س1', value: 210 },
  { label: 'س2', value: 260 },
  { label: 'س3', value: 190 },
  { label: 'س4', value: 300 },
  { label: 'س5', value: 250 },
  { label: 'س6', value: 320 },
]

const findingTypes = [
  { label: 'تلف بسيط في الجدران', pct: 34, tone: '#155C70' },
  { label: 'أعطال كهربائية بسيطة', pct: 26, tone: '#C88920' },
  { label: 'تسريبات مياه', pct: 22, tone: '#C94A4A' },
  { label: 'ملاحظات أخرى', pct: 18, tone: '#9A948C' },
]

const assetStatus = [
  { label: 'جيدة', pct: 68, tone: 'bg-success' },
  { label: 'تحتاج صيانة', pct: 22, tone: 'bg-warning' },
  { label: 'غير محددة', pct: 10, tone: 'bg-secondary' },
]

export default function Analytics() {
  const [period, setPeriod] = useState('هذا الشهر')

  return (
    <AppShell title="التحليلات" subtitle="نظرة تحليلية على أداء المعاينات.">
      <div className="mb-5 flex gap-2">
        {['اليوم', 'هذا الأسبوع', 'هذا الشهر'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
              period === p ? 'bg-primary text-white' : 'bg-white border border-black/10 text-ink/60 hover:bg-black/[0.03]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={ClipboardList} value="1,248" label="إجمالي المعاينات" tone="primary" />
        <StatCard icon={Timer} value="34 دقيقة" label="متوسط زمن المعاينة" tone="muted" />
        <StatCard icon={Database} value="96%" label="اكتمال البيانات" tone="success" />
        <StatCard icon={BrainCircuit} value="94%" label="دقة نتائج AI" tone="warning" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="mb-6 text-base font-bold text-ink">المعاينات حسب الفترة</h3>
          <div className="flex h-48 items-end justify-between gap-3">
            {periodBars.map((b) => (
              <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end">
                  <div
                    className="w-full rounded-t-md bg-primary/85"
                    style={{ height: `${(b.value / 320) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-ink/45">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="mb-6 text-base font-bold text-ink">أنواع الملاحظات</h3>
          <div className="space-y-4">
            {findingTypes.map((f) => (
              <div key={f.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-ink/70">{f.label}</span>
                  <span className="font-semibold text-ink/60">{f.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-black/[0.06]">
                  <div className="h-full rounded-full" style={{ width: `${f.pct}%`, backgroundColor: f.tone }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="mb-6 text-base font-bold text-ink">حالة الأصول</h3>
          <div className="flex h-6 overflow-hidden rounded-full">
            {assetStatus.map((s) => (
              <div key={s.label} className={s.tone} style={{ width: `${s.pct}%` }} title={`${s.label} ${s.pct}%`} />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            {assetStatus.map((s) => (
              <span key={s.label} className="flex items-center gap-1.5 text-ink/60">
                <span className={`h-2 w-2 rounded-full ${s.tone}`} />
                {s.label} ({s.pct}%)
              </span>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="mb-6 text-base font-bold text-ink">متوسط زمن المعاينة</h3>
          <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
            <span className="text-4xl font-extrabold text-primary">34</span>
            <span className="text-sm text-ink/50">دقيقة لكل معاينة، بانخفاض 18% مقارنة بالنموذج اليدوي</span>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
