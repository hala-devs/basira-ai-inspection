import { Link } from 'react-router-dom'
import {
  ScanEye,
  Camera,
  BrainCircuit,
  ShieldCheck,
  FileCheck2,
  Gauge,
  Zap,
  Sparkles,
  FileSearch,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'
import Logo from '../components/ui/Logo'

const workflowSteps = [
  { n: 1, title: 'تحديد الأصل', icon: ScanEye },
  { n: 2, title: 'المعاينة', icon: Camera },
  { n: 3, title: 'تحليل AI', icon: BrainCircuit },
  { n: 4, title: 'المراجعة', icon: ShieldCheck },
  { n: 5, title: 'التقرير', icon: FileCheck2 },
]

const valueCards = [
  {
    icon: Gauge,
    title: 'دقة أعلى',
    desc: 'تقليل احتمالية فقدان التفاصيل والأخطاء في إدخال البيانات.',
  },
  {
    icon: Zap,
    title: 'سرعة أعلى',
    desc: 'تحويل الملاحظات والصور إلى بيانات منظمة أثناء المعاينة.',
  },
  {
    icon: Sparkles,
    title: 'جهد أقل',
    desc: 'تقليل الأعمال المتكررة في التصوير والتوثيق وإعداد التقارير.',
  },
  {
    icon: FileSearch,
    title: 'توثيق أقوى',
    desc: 'كل نتيجة قابلة للرجوع إلى مصدرها الأصلي.',
  },
]

export default function Landing() {
  return (
    <div dir="rtl" className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-30 border-b border-black/[0.06] bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
            <a href="#how" className="hover:text-primary">كيف يعمل؟</a>
            <a href="#value" className="hover:text-primary">القيمة</a>
            <a href="#trust" className="hover:text-primary">الثقة والتحقق</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost hidden sm:inline-flex">تسجيل الدخول</Link>
            <Link to="/login" className="btn-primary">ابدأ معاينة</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge mx-auto bg-primary/10 text-primary">
            <Sparkles size={14} />
            من المعاينة اليدوية إلى المعاينة الذكية
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            بصيرة
          </h1>
          <p className="mt-5 text-xl font-semibold text-primary-dark">
            معاينة أسرع، بيانات أدق، وتوثيق قابل للتحقق.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink/60">
            مساعد ذكي يرافق المعاين من تحديد الأصل وحتى اعتماد التقرير، مع توثيق كل نتيجة بمصدرها الأصلي.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/login" className="btn-primary px-6 py-3 text-base">
              ابدأ معاينة
              <ArrowLeft size={18} />
            </Link>
            <a href="#how" className="btn-secondary px-6 py-3 text-base">
              كيف يعمل؟
            </a>
          </div>
        </div>

        {/* Workflow visual */}
        <div id="how" className="mx-auto mt-20 max-w-5xl scroll-mt-24">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {workflowSteps.map((s, i) => (
              <div key={s.n} className="relative flex flex-col items-center text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-lg bg-white border border-black/[0.06] shadow-card text-primary">
                  <s.icon size={24} strokeWidth={1.75} />
                </div>
                <span className="text-xs font-bold text-primary">{s.n}</span>
                <span className="mt-1 text-sm font-semibold text-ink">{s.title}</span>
                {i < workflowSteps.length - 1 && (
                  <div className="absolute top-7 right-[-30%] hidden h-px w-[60%] bg-black/10 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value cards */}
      <section id="value" className="border-y border-black/[0.06] bg-white py-16 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valueCards.map((v) => (
              <div key={v.title} className="card p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary-light text-primary">
                  <v.icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI works with inspector */}
      <section id="trust" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
            AI يعمل مع المعاين، وليس بدلًا عنه.
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { title: 'المعاين', desc: 'يجمع الأدلة', icon: Camera },
            { title: 'AI', desc: 'يحلل ويوثّق', icon: BrainCircuit },
            { title: 'المراجع', desc: 'يتحقق ويعتمد', icon: ShieldCheck },
          ].map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon size={26} strokeWidth={1.75} />
              </div>
              <h4 className="mt-4 text-base font-bold text-ink">{step.title}</h4>
              <p className="mt-1 text-sm text-ink/60">{step.desc}</p>
              {i < 2 && <div className="mt-4 h-px w-16 rotate-90 bg-black/10 sm:hidden" />}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-lg border border-primary/15 bg-primary-light p-8 text-center">
          <p className="text-lg font-semibold leading-loose text-primary-dark">
            "المعاين لا يحتاج مساعدًا يكتب عنه فقط… بل يحتاج مساعدًا يرى معه، يوثّق معه، يحلل معه، ويجهز له العمل حتى التسليم."
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink/60">
          {['اقتراح من AI', 'نتيجة أولية', 'درجة الثقة', 'تحتاج مراجعة', 'اعتماد النتيجة'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-success" />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary-dark py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            نحن لا نستبدل المعاين. نحن نضاعف قدرته.
          </h2>
          <p className="mt-4 text-base text-white/70">
            جرّب تجربة المعاينة الذكية كاملة من التحديد حتى التقرير المعتمد.
          </p>
          <Link to="/login" className="btn mt-8 inline-flex bg-white px-7 py-3 text-base font-bold text-primary-dark hover:bg-white/90">
            ابدأ معاينة الآن
            <ArrowLeft size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] bg-white py-8 text-center text-sm text-ink/40">
        © 2026 بصيرة — نموذج تجريبي لعرض المفهوم.
      </footer>
    </div>
  )
}
