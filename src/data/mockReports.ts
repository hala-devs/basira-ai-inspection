import type { Report } from '../types'

export const mockReports: Report[] = [
  {
    id: 'RPT-9001',
    inspectionId: 'INSP-3001',
    assetName: 'فيلا سكنية',
    location: 'الرياض، حي الياسمين',
    area: 420,
    status: 'مكتمل',
    overallCondition: 'جيدة',
    goodCount: 18,
    notesCount: 3,
    criticalCount: 1,
    items: [
      { label: 'الجدران', status: 'جيدة', note: 'علامة تلف بسيطة', sourceId: 'SRC-08' },
      { label: 'الأرضيات', status: 'جيدة', note: 'لا توجد ملاحظات', sourceId: 'SRC-11' },
      { label: 'التكييف', status: 'جيدة', note: 'المكيف يعمل بكفاءة جيدة', sourceId: 'SRC-14' },
      { label: 'الأبواب والنوافذ', status: 'مقبولة', note: 'تحتاج ضبط بسيط في المفصلات', sourceId: 'SRC-11' },
      { label: 'الإضاءة', status: 'جيدة', note: 'جميع الوحدات تعمل', sourceId: 'SRC-08' },
    ],
    approvedBy: 'سارة القحطاني',
    approvedDate: '2026-09-02',
  },
  {
    id: 'RPT-9002',
    inspectionId: 'INSP-3005',
    assetName: 'فيلا سكنية',
    location: 'الدمام، حي الشاطئ',
    area: 500,
    status: 'مكتمل',
    overallCondition: 'جيدة جدًا',
    goodCount: 22,
    notesCount: 1,
    criticalCount: 0,
    items: [
      { label: 'الواجهة الخارجية', status: 'جيدة', note: 'الحالة الظاهرة جيدة عمومًا', sourceId: 'SRC-02' },
      { label: 'السياج والبوابة', status: 'جيدة', note: 'لا توجد ملاحظات', sourceId: 'SRC-02' },
    ],
    approvedBy: 'أحمد العتيبي',
    approvedDate: '2026-06-19',
  },
  {
    id: 'RPT-9003',
    inspectionId: 'INSP-3008',
    assetName: 'مبنى تجاري',
    location: 'الرياض، طريق الملك فهد',
    area: 850,
    status: 'مكتمل',
    overallCondition: 'جيدة',
    goodCount: 30,
    notesCount: 4,
    criticalCount: 0,
    items: [
      { label: 'بهو الاستقبال', status: 'جيدة', note: 'جميع الأنظمة تعمل بشكل طبيعي', sourceId: 'SRC-40' },
      { label: 'المصاعد', status: 'جيدة', note: 'تمت الصيانة الدورية', sourceId: 'SRC-40' },
    ],
    approvedBy: 'نورة الدوسري',
    approvedDate: '2026-07-31',
  },
]

export const getReportByInspectionId = (inspectionId: string) =>
  mockReports.find((r) => r.inspectionId === inspectionId)

export const getReportById = (id: string) => mockReports.find((r) => r.id === id)
