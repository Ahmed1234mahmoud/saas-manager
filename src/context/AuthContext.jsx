import { createContext, useContext, useState, useEffect } from 'react'
import { mockUser } from '../data/mockData'

const AuthContext = createContext(undefined)

/**
 * AuthProvider Component
 * Manages user authentication state
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for stored auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      // Simulate token validation
      setUser(mockUser)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email, password) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // For demo purposes, accept any credentials
      const token = 'mock_token_' + Date.now()
      localStorage.setItem('authToken', token)
      setUser(mockUser)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (name, email, password) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      const newUser = {
        ...mockUser,
        name,
        email,
      }
      const token = 'mock_token_' + Date.now()
      localStorage.setItem('authToken', token)
      setUser(newUser)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
    setIsAuthenticated(false)
  }

  // Update user profile
  const updateProfile = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }))
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth Hook
 * Custom hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
