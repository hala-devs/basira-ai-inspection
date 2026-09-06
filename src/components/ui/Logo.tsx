import { ScanEye } from 'lucide-react'

export default function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-white">
        <ScanEye size={20} strokeWidth={2} />
      </div>
      {!collapsed && (
        <div className="leading-tight">
          <div className="text-[15px] font-bold text-ink">بصيرة</div>
          <div className="text-[11px] text-secondary">Baseera</div>
        </div>
      )}
    </div>
  )
}
