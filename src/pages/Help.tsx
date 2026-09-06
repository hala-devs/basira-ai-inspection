import { HelpCircle, Mail, MessageCircle } from 'lucide-react'
import AppShell from '../components/layout/AppShell'

const faqs = [
  { q: 'كيف يعمل تحليل AI أثناء المعاينة؟', a: 'يقوم النظام بتحليل الصور والفيديو الملتقطة أثناء المعاينة واقتراح نتائج أولية مع درجة ثقة، مع إمكانية الرجوع دائمًا للمصدر الأصلي.' },
  { q: 'هل يمكن تعديل نتائج AI؟', a: 'نعم، يمكن للمعاين أو المراجع تعديل أي نتيجة أولية قبل اعتمادها ضمن التقرير النهائي.' },
  { q: 'من يعتمد التقرير النهائي؟', a: 'يقوم المراجع المختص باعتماد النتائج بعد التحقق منها، وليس الذكاء الاصطناعي.' },
]

export default function Help() {
  return (
    <AppShell title="المساعدة" subtitle="إجابات على الأسئلة الشائعة وطرق التواصل.">
      <div className="mx-auto max-w-2xl space-y-3">
        {faqs.map((f) => (
          <div key={f.q} className="card p-5">
            <div className="flex items-start gap-3">
              <HelpCircle size={18} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <h3 className="text-sm font-bold text-ink">{f.q}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{f.a}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="card flex flex-col items-center gap-3 p-8 text-center">
          <p className="text-sm font-medium text-ink/60">هل تحتاج مساعدة إضافية؟</p>
          <div className="flex gap-3">
            <button className="btn-secondary text-sm">
              <Mail size={15} />
              راسلنا
            </button>
            <button className="btn-primary text-sm">
              <MessageCircle size={15} />
              الدردشة المباشرة
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
