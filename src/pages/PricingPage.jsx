import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pricingPlans } from '../data/mockData'

export default function PricingPage() {
  return (
    <div className="min-h-screen py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-dark-600 dark:text-dark-400">
          Choose the plan that's right for you
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-8 relative ${
                plan.popular ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-dark-600 dark:text-dark-400 mb-4">
                {plan.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-dark-900 dark:text-white">
                  ${plan.price}
                </span>
                {plan.price > 0 && (
                  <span className="text-dark-500 dark:text-dark-400">
                    /{plan.period}
                  </span>
                )}
              </div>
              <Link
                to="/register"
                className={`block w-full py-3 text-center rounded-xl font-medium transition-colors ${
                  plan.popular
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-dark-100 dark:bg-dark-800 text-dark-900 dark:text-white hover:bg-dark-200 dark:hover:bg-dark-700'
                }`}
              >
                {plan.cta}
              </Link>
              <div className="mt-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-dark-600 dark:text-dark-400">
                    <Check size={18} className="text-green-500" />
                    {feature}
                  </div>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-dark-400 dark:text-dark-500">
                    <X size={18} />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-4 mt-24"
      >
        <h2 className="text-3xl font-bold text-dark-900 dark:text-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: 'Can I change plans later?',
              a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.'
            },
            {
              q: 'Is there a free trial?',
              a: 'Yes! All paid plans come with a 14-day free trial. No credit card required.'
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
            },
            {
              q: 'Can I cancel anytime?',
              a: 'Absolutely. You can cancel your subscription at any time with no questions asked.'
            }
          ].map((faq, index) => (
            <div key={index} className="glass-card p-6">
              <h3 className="font-semibold text-dark-900 dark:text-white mb-2">
                {faq.q}
              </h3>
              <p className="text-dark-600 dark:text-dark-400">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
