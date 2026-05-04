import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, Check, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('') 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // استدعاء عنوان السيرفر الموحد
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://saas-backend-production-a778.up.railway.app";

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /[0-9]/.test(password) },
  ]

  const isPasswordValid = passwordRequirements.every(req => req.met)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isPasswordValid) {
      setError('Please meet all password requirements')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // تعديل مسار الـ API لضمان الربط الصحيح مع Railway
      const response = await axios.post(`${API_BASE_URL}/api/register`, {
        name: name.trim(),
        email: email.trim(),
        password: password
      });

      if (response.status === 201) {
        alert("Account created successfully! Please login.")
        navigate('/login') 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white dark:bg-[#0f172a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Get Started
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your TaskFlow AI account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl text-sm relative"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {password.length > 0 && (
            <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700">
              {passwordRequirements.map((req, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-2 text-xs ${
                    req.met 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {req.met ? <Check size={14} /> : <X size={14} />}
                  {req.label}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-start">
            <input 
              type="checkbox" 
              className="w-4 h-4 mt-1 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500" 
              required
            />
            <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
              I agree to the{' '}
              <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </Link>
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center p-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:bg-blue-400 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating account...
              </div>
            ) : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}