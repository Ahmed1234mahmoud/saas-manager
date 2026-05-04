import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Automation',
    description: 'Let AI handle your repetitive tasks while you focus on what matters.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Your data is protected with bank-level encryption and security.'
  },
  {
    icon: Sparkles,
    title: 'Smart Insights',
    description: 'Get actionable insights powered by advanced AI algorithms.'
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-dark-900 dark:text-white mb-6">
              Boost Your Productivity with{' '}
              <span className="gradient-text">AI Power</span>
            </h1>
            <p className="text-xl text-dark-600 dark:text-dark-400 mb-8 max-w-2xl mx-auto">
              TaskFlow AI helps you accomplish more with less effort. 
              Intelligent task management powered by cutting-edge AI.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register" className="btn-primary flex items-center gap-2">
                Get Started <ArrowRight size={20} />
              </Link>
              <Link to="/pricing" className="btn-secondary">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Why Choose TaskFlow AI?
            </h2>
            <p className="text-dark-600 dark:text-dark-400">
              Powerful features to supercharge your workflow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-primary-600 dark:text-primary-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to boost your productivity?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Join thousands of users who are already saving 10+ hours every week.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-colors"
          >
            Start Free Trial <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
