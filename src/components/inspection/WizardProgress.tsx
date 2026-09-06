import { Check } from 'lucide-react'

const steps = ['الأصل', 'النموذج', 'المعاينة', 'المراجعة', 'التقرير']

export default function WizardProgress({ current }: { current: number }) {
  return (
    <div className="mb-8 flex items-center">
      {steps.map((s, i) => {
        const idx = i + 1
        const done = idx < current
        const active = idx === current
        return (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  done
                    ? 'bg-primary text-white'
                    : active
                    ? 'bg-primary-light text-primary ring-2 ring-primary'
                    : 'bg-black/[0.05] text-ink/35'
                }`}
              >
                {done ? <Check size={16} /> : idx}
              </div>
              <span className={`text-xs font-medium ${active ? 'text-primary' : done ? 'text-ink/70' : 'text-ink/35'}`}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 rounded ${done ? 'bg-primary' : 'bg-black/[0.06]'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
