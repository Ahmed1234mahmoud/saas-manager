import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

/**
 * Footer Component
 * Footer for the landing page
 */
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-dark-800 border-t border-dark-200 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold gradient-text">TaskFlow AI</span>
            </Link>
            <p className="mt-4 text-sm text-dark-500 dark:text-dark-400">
              AI-powered productivity platform that helps you achieve more.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="p-2 rounded-lg bg-dark-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-dark-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-dark-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-dark-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-dark-900 dark:text-dark-100 mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-sm text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors"
                >
                  Integrations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-dark-900 dark:text-dark-100 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-dark-900 dark:text-dark-100 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-100 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-dark-200 dark:border-dark-700">
          <p className="text-center text-sm text-dark-500 dark:text-dark-400">
            © {currentYear} TaskFlow AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
