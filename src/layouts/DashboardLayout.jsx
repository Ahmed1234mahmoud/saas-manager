import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Kanban,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Plus,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { dashboardNavItems } from '../data/mockData'

/**
 * DashboardLayout Component
 * Layout for authenticated pages (Dashboard, Tasks)
 */
function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // Handle logout
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Icon mapping
  const getIcon = (iconName) => {
    const icons = {
      LayoutDashboard: LayoutDashboard,
      Kanban: Kanban,
    }
    return icons[iconName] || LayoutDashboard
  }

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-dark-800 border-r border-dark-200 dark:border-dark-700 z-50 lg:static lg:translate-x-0"
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="p-6 border-b border-dark-200 dark:border-dark-700">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold gradient-text">TaskFlow AI</h1>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {dashboardNavItems.map((item) => {
                  const Icon = getIcon(item.icon)
                  const isActive = location.pathname === item.href
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        navigate(item.href)
                        setSidebarOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          : 'text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  )
                })}
              </nav>

              {/* User Section */}
              <div className="p-4 border-t border-dark-200 dark:border-dark-700">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-dark-900 dark:text-dark-100 truncate">
                      {user?.name}
                    </p>
                    <p className="text-sm text-dark-500 dark:text-dark-400 truncate">
                      {user?.role}
                    </p>
                  </div>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
                >
                  {isDark ? (
                    <>
                      <span className="text-xl">🌙</span>
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl">☀️</span>
                      <span>Light Mode</span>
                    </>
                  )}
                </button>

                {/* Settings & Logout */}
                <div className="mt-2 space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-800/80 backdrop-blur-md border-b border-dark-200 dark:border-dark-700">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-dark-100 dark:bg-dark-700 rounded-xl">
                <Search className="w-4 h-4 text-dark-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="bg-transparent border-none outline-none text-sm w-48 lg:w-64"
                />
                <kbd className="hidden lg:inline px-2 py-0.5 text-xs bg-dark-200 dark:bg-dark-600 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* New Task Button */}
              <button
                onClick={() => navigate('/tasks')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">New Task</span>
              </button>

              {/* Notifications */}
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Theme Toggle (Desktop) */}
              <button
                onClick={toggleTheme}
                className="hidden lg:flex p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
              >
                {isDark ? (
                  <span className="text-xl">🌙</span>
                ) : (
                  <span className="text-xl">☀️</span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
