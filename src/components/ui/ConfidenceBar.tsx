export default function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 90 ? 'bg-success' : value >= 75 ? 'bg-warning' : 'bg-error'
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-black/[0.06]">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold text-ink/70 tabular-nums">{value}%</span>
    </div>
  )
}
