import type { ReactNode } from 'react'

type Tone = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'muted'

const toneClasses: Record<Tone, string> = {
  default: 'bg-black/[0.05] text-ink/70',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
  muted: 'bg-secondary/10 text-secondary',
}

export default function Badge({ children, tone = 'default', icon }: { children: ReactNode; tone?: Tone; icon?: ReactNode }) {
  return (
    <span className={`badge ${toneClasses[tone]}`}>
      {icon}
      {children}
    </span>
  )
}

export function statusTone(status: string): Tone {
  switch (status) {
    case 'مكتملة':
    case 'مكتمل':
    case 'جيدة':
    case 'معتمدة':
      return 'success'
    case 'قيد المراجعة':
    case 'تحتاج صيانة':
    case 'نتيجة أولية':
      return 'warning'
    case 'قيد تحليل AI':
      return 'primary'
    case 'قيد المعاينة':
      return 'muted'
    case 'جديدة':
      return 'default'
    default:
      return 'default'
  }
}
