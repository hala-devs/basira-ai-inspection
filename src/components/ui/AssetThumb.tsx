import { Building2, Home, Warehouse } from 'lucide-react'

const iconMap: Record<string, typeof Home> = {
  villa: Home,
  apartment: Home,
  commercial: Building2,
  warehouse: Warehouse,
}

export default function AssetThumb({ image, className = '' }: { image: string; className?: string }) {
  const Icon = iconMap[image] ?? Home
  return (
    <div className={`flex items-center justify-center rounded-md bg-primary-light text-primary ${className}`}>
      <Icon size={20} strokeWidth={1.75} />
    </div>
  )
}
