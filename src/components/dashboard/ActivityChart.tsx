const data = [
  { day: 'السبت', value: 18 },
  { day: 'الأحد', value: 24 },
  { day: 'الاثنين', value: 20 },
  { day: 'الثلاثاء', value: 30 },
  { day: 'الأربعاء', value: 22 },
  { day: 'الخميس', value: 27 },
  { day: 'الجمعة', value: 12 },
]

export default function ActivityChart() {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-bold text-ink">نشاط المعاينات</h3>
        <span className="text-xs text-ink/40">آخر 7 أيام</span>
      </div>
      <div className="flex h-48 items-end justify-between gap-3">
        {data.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-40 w-full items-end">
              <div
                className="w-full rounded-t-md bg-primary/85 transition-all hover:bg-primary"
                style={{ height: `${(d.value / max) * 100}%` }}
                title={`${d.value} معاينة`}
              />
            </div>
            <span className="text-[11px] text-ink/45">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
