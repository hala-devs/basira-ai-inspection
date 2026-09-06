export type InspectionStatus =
  | 'جديدة'
  | 'قيد المعاينة'
  | 'قيد تحليل AI'
  | 'قيد المراجعة'
  | 'مكتملة'

export type AssetType = 'سكني' | 'تجاري' | 'صناعي'

export interface Asset {
  id: string
  name: string
  type: AssetType
  city: string
  district: string
  area: number
  rooms: number
  image: string
  lastInspectionDate?: string
  status: 'جيدة' | 'تحتاج صيانة' | 'غير محددة'
}

export interface Inspector {
  id: string
  name: string
  avatarColor: string
}

export interface SourceMedia {
  id: string
  label: string
  type: 'image' | 'video'
  timestamp: string
  room: string
}

export interface AIFinding {
  id: string
  room: string
  detectedObjects: string[]
  condition: 'ممتازة' | 'جيدة' | 'مقبولة' | 'تحتاج صيانة'
  note: string
  confidence: number
  sourceId: string
  reviewStatus: 'نتيجة أولية' | 'معتمدة' | 'معدّلة'
}

export interface Inspection {
  id: string
  assetId: string
  assetName: string
  location: string
  inspectorId: string
  inspectorName: string
  status: InspectionStatus
  date: string
  durationMinutes?: number
  findings: AIFinding[]
  sources: SourceMedia[]
}

export interface ReportItem {
  label: string
  status: 'جيدة' | 'مقبولة' | 'تحتاج صيانة'
  note: string
  sourceId: string
}

export interface Report {
  id: string
  inspectionId: string
  assetName: string
  location: string
  area: number
  status: 'مكتمل' | 'مسودة'
  overallCondition: string
  goodCount: number
  notesCount: number
  criticalCount: number
  items: ReportItem[]
  approvedBy: string
  approvedDate: string
}
