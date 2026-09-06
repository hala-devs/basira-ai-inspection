import type { LucideIcon } from 'lucide-react'

export default function StatCard({
  icon: Icon,
  value,
  label,
  tone = 'primary',
}: {
  icon: LucideIcon
  value: string
  label: string
  tone?: 'primary' | 'warning' | 'success' | 'muted'
}) {
  const toneClasses = {
    primary: 'bg-primary-light text-primary',
    warning: 'bg-warning/10 text-warning',
    success: 'bg-success/10 text-success',
    muted: 'bg-secondary/10 text-secondary',
  }[tone]

  return (
    <div className="card flex items-center gap-4 p-5">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${toneClasses}`}>
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-extrabold text-ink tabular-nums">{value}</div>
        <div className="truncate text-sm text-ink/50">{label}</div>
      </div>
    </div>
  )
}
