import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import AssetThumb from '../components/ui/AssetThumb'
import Badge, { statusTone } from '../components/ui/Badge'
import { mockAssets } from '../data/mockAssets'

export default function Assets() {
  const navigate = useNavigate()
  return (
    <AppShell title="الأصول" subtitle="جميع الأصول المسجّلة في النظام.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockAssets.map((a) => (
          <button
            key={a.id}
            onClick={() => navigate(`/assets/${a.id}`)}
            className="card flex flex-col items-start gap-3 p-5 text-start hover:border-primary/30"
          >
            <div className="flex w-full items-center justify-between">
              <AssetThumb image={a.image} className="h-11 w-11" />
              <Badge tone={statusTone(a.status)}>{a.status}</Badge>
            </div>
            <div>
              <h3 className="font-bold text-ink">{a.name}</h3>
              <p className="mt-0.5 text-sm text-ink/50">{a.city}، {a.district}</p>
              <p className="mt-1 text-xs text-ink/40">{a.area} م² • {a.rooms} غرف • {a.type}</p>
            </div>
            <div className="flex w-full items-center justify-between border-t border-black/[0.06] pt-3 text-xs text-ink/45">
              <span>{a.id}</span>
              <span className="flex items-center gap-1 font-medium text-primary">
                التفاصيل
                <ChevronLeft size={13} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </AppShell>
  )
}
