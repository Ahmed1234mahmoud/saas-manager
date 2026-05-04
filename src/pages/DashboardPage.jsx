import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  ListTodo, 
  Clock, 
  CheckCircle,
  BarChart3
} from 'lucide-react'
import { dashboardStats } from '../data/mockData'

const stats = [
  { icon: TrendingUp, label: 'Productivity', value: '87%', change: '+12%' },
  { icon: ListTodo, label: 'Total Tasks', value: '156', change: '+23' },
  { icon: Clock, label: 'Hours Saved', value: '48h', change: '+8h' },
  { icon: CheckCircle, label: 'Completed', value: '134', change: '+18' }
]

export default function DashboardPage() {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-dark-600 dark:text-dark-400">
          Welcome back! Here's your productivity overview.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center">
                <stat.icon className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-dark-600 dark:text-dark-400 text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-dark-900 dark:text-white">
            Recent Tasks
          </h2>
          <button className="text-primary-600 dark:text-primary-400 text-sm font-medium">
            View All
          </button>
        </div>
<div className="space-y-4">
          {dashboardStats.recentActivity.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-dark-50 dark:bg-dark-800 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-dark-900 dark:text-white">
                    {task.title}
                  </h4>
                  <p className="text-sm text-dark-500 dark:text-dark-400">
                    {task.action}
                  </p>
                </div>
              </div>
              <span className="text-sm text-dark-400 dark:text-dark-500">
                {task.time}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Productivity Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 mt-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-dark-900 dark:text-white">
            Productivity Trends
          </h2>
          <BarChart3 className="text-dark-400" size={24} />
        </div>
        <div className="h-64 flex items-center justify-center bg-dark-50 dark:bg-dark-800 rounded-xl">
          <p className="text-dark-400 dark:text-dark-500">
            Chart visualization will appear here
          </p>
        </div>
      </motion.div>
    </div>
  )
}
