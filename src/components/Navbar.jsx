import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, ChevronRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { navItems } from '../data/mockData'

/**
 * Navbar Component
 * Main navigation for the landing page
 */
function Navbar() {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-dark-200 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold gradient-text">TaskFlow AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors link-hover"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-dark-400" />
              ) : (
                <Moon className="w-5 h-5 text-dark-600" />
              )}
            </button>

            {/* Login Button */}
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 font-medium transition-colors"
            >
              Log in
            </button>

            {/* Get Started Button */}
            <button
              onClick={() => navigate('/register')}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-all hover:shadow-glow"
            >
              Get Started
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-dark-200 dark:border-dark-700"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => {
                    navigate('/login')
                    setMobileMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 text-center text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 font-medium transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    navigate('/register')
                    setMobileMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-all"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
