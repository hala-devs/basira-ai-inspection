import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, ArrowLeft } from 'lucide-react'
import Logo from '../components/ui/Logo'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="card p-8">
          <h1 className="text-center text-2xl font-extrabold text-ink">مرحبًا بعودتك</h1>
          <p className="mt-2 text-center text-sm text-ink/50">سجّل الدخول إلى بصيرة</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="label">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={17} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="input pe-3.5 ps-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="label">كلمة المرور</label>
              <div className="relative">
                <Lock size={17} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pe-3.5 ps-10"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              تسجيل الدخول
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-black/10" />
            <span className="text-xs text-ink/40">أو</span>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          <button onClick={() => navigate('/dashboard')} className="btn-secondary w-full py-3">
            الدخول التجريبي
            <ArrowLeft size={16} />
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-ink/40">نموذج تجريبي — لا يتطلب بيانات اعتماد حقيقية.</p>
      </div>
    </div>
  )
}
