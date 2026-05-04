import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios' // 1. استدعاء مكتبة axios

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('') // حالة لعرض الأخطاء

  const handleSubmit = async (e) => { // 2. تحويل الفنكشن لـ async
    e.preventDefault()
    setIsLoading(true)
    setError('') 

    try {
      // 3. إرسال البيانات للباك اند
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      if (response.status === 200) {
        // لو الدخول نجح، بنوديه للـ dashboard
        navigate('/dashboard')
      }
    } catch (err) {
      // 4. معالجة الخطأ لو البيانات غلط أو السيرفر واقف
      setError(err.response?.data?.message || 'Something went wrong')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-dark-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-dark-600 dark:text-dark-400">
            Sign in to continue to TaskFlow AI
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* عرض رسالة الخطأ إن وجدت */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field pl-12 w-full" // تأكدت من إضافة w-full
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field pl-12 pr-12 w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600 dark:hover:text-dark-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-primary-500 rounded border-dark-300 dark:border-dark-600" />
              <span className="ml-2 text-sm text-dark-600 dark:text-dark-400">
                Remember me
              </span>
            </label>
            <Link to="/forgot-password" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center p-3 rounded-lg bg-blue-600 text-white disabled:bg-blue-300"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-dark-600 dark:text-dark-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}