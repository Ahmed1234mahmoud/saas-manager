import { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext(undefined)

/**
 * NotificationProvider Component
 * Manages notifications and toasts throughout the app
 */
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  // Add a new notification
  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      type: 'info', // info, success, warning, error
      duration: 5000,
      ...notification,
    }

    setNotifications((prev) => [...prev, newNotification])

    // Auto-remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }, [])

  // Remove a notification
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  // Convenience methods
  const showSuccess = useCallback((message, title) => {
    return addNotification({ type: 'success', title, message })
  }, [addNotification])

  const showError = useCallback((message, title) => {
    return addNotification({ type: 'error', title, message, duration: 7000 })
  }, [addNotification])

  const showWarning = useCallback((message, title) => {
    return addNotification({ type: 'warning', title, message })
  }, [addNotification])

  const showInfo = useCallback((message, title) => {
    return addNotification({ type: 'info', title, message })
  }, [addNotification])

  const value = {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

/**
 * useNotification Hook
 * Custom hook to access notification context
 */
export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
