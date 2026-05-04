import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useNotification } from '../context/NotificationContext'

/**
 * NotificationToast Component
 * Displays notifications as toast messages
 */
function NotificationToast() {
  const { notifications, removeNotification } = useNotification()

  // Get icon based on notification type
  const getIcon = (type) => {
    const icons = {
      success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
      error: <AlertCircle className="w-5 h-5 text-red-500" />,
      warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      info: <Info className="w-5 h-5 text-primary-500" />,
    }
    return icons[type] || icons.info
  }

  // Get background color based on type
  const getBgColor = (type) => {
    const colors = {
      success: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
      error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
      info: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800',
    }
    return colors[type] || colors.info
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md w-80 ${getBgColor(
              notification.type
            )}`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {notification.title && (
                <p className="font-medium text-dark-900 dark:text-dark-100">
                  {notification.title}
                </p>
              )}
              <p className="text-sm text-dark-600 dark:text-dark-400">
                {notification.message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default NotificationToast
