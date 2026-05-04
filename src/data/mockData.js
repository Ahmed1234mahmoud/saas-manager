/**
 * Mock Data
 * Contains all dummy data for the application
 */

// User data
export const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'Pro Member',
  createdAt: '2024-01-15',
}

// Dashboard Statistics
export const dashboardStats = {
  totalTasks: 47,
  completedTasks: 32,
  pendingTasks: 15,
  productivityScore: 87,
  weeklyProgress: [
    { day: 'Mon', tasks: 8 },
    { day: 'Tue', tasks: 12 },
    { day: 'Wed', tasks: 6 },
    { day: 'Thu', tasks: 15 },
    { day: 'Fri', tasks: 10 },
    { day: 'Sat', tasks: 4 },
    { day: 'Sun', tasks: 2 },
  ],
  categoryBreakdown: [
    { name: 'Work', count: 22, color: 'bg-primary-500' },
    { name: 'Personal', count: 15, color: 'bg-purple-500' },
    { name: 'Health', count: 6, color: 'bg-emerald-500' },
    { name: 'Learning', count: 4, color: 'bg-amber-500' },
  ],
  recentActivity: [
    { id: '1', action: 'Completed task', title: 'Design new landing page', time: '2 hours ago' },
    { id: '2', action: 'Created task', title: 'Write blog post', time: '4 hours ago' },
    { id: '3', action: 'Completed task', title: 'Review PR #42', time: 'Yesterday' },
    { id: '4', action: 'Generated plan', title: 'Q1 marketing strategy', time: 'Yesterday' },
  ],
}

// Initial Kanban Board Data
export const initialBoardData = {
  todo: {
    id: 'todo',
    title: 'To Do',
    color: 'border-yellow-500',
    tasks: [
      { id: 't1', title: 'Design new dashboard layout', priority: 'high', category: 'Work', dueDate: '2024-02-01', assignee: mockUser },
      { id: 't2', title: 'Write API documentation', priority: 'medium', category: 'Work', dueDate: '2024-02-03', assignee: mockUser },
      { id: 't3', title: 'Set up CI/CD pipeline', priority: 'high', category: 'Work', dueDate: '2024-02-05', assignee: mockUser },
    ],
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    color: 'border-primary-500',
    tasks: [
      { id: 't4', title: 'Implement user authentication', priority: 'high', category: 'Work', dueDate: '2024-01-30', assignee: mockUser },
      { id: 't5', title: 'Create onboarding flow', priority: 'medium', category: 'Work', dueDate: '2024-02-02', assignee: mockUser },
    ],
  },
  review: {
    id: 'review',
    title: 'Review',
    color: 'border-purple-500',
    tasks: [
      { id: 't6', title: 'Code review: Login component', priority: 'medium', category: 'Work', dueDate: '2024-01-28', assignee: mockUser },
    ],
  },
  done: {
    id: 'done',
    title: 'Done',
    color: 'border-emerald-500',
    tasks: [
      { id: 't7', title: 'Project setup and configuration', priority: 'high', category: 'Work', dueDate: '2024-01-20', assignee: mockUser },
      { id: 't8', title: 'Design system tokens', priority: 'medium', category: 'Work', dueDate: '2024-01-22', assignee: mockUser },
      { id: 't9', title: 'Database schema design', priority: 'high', category: 'Work', dueDate: '2024-01-25', assignee: mockUser },
    ],
  },
}

// AI Task Generator Sample Responses
export const aiTaskTemplates = [
  {
    goal: 'Launch a new product',
    tasks: [
      { title: 'Define target audience and market fit', priority: 'high' },
      { title: 'Create product roadmap and timeline', priority: 'high' },
      { title: 'Design MVP features list', priority: 'high' },
      { title: 'Set up branding and visual identity', priority: 'medium' },
      { title: 'Develop landing page', priority: 'high' },
      { title: 'Create marketing materials', priority: 'medium' },
      { title: 'Build email marketing campaign', priority: 'medium' },
      { title: 'Prepare launch press release', priority: 'medium' },
      { title: 'Set up analytics tracking', priority: 'medium' },
      { title: 'Plan launch day activities', priority: 'high' },
    ],
  },
  {
    goal: 'Learn a new programming language',
    tasks: [
      { title: 'Choose learning resources', priority: 'high' },
      { title: 'Set up development environment', priority: 'high' },
      { title: 'Complete basic syntax tutorials', priority: 'high' },
      { title: 'Practice with small exercises', priority: 'medium' },
      { title: 'Build a simple project', priority: 'high' },
      { title: 'Read official documentation', priority: 'medium' },
      { title: 'Complete advanced tutorials', priority: 'medium' },
      { title: 'Build a more complex project', priority: 'high' },
      { title: 'Contribute to open source', priority: 'medium' },
      { title: 'Teach others what you learned', priority: 'low' },
    ],
  },
  {
    goal: 'Improve fitness and health',
    tasks: [
      { title: 'Set fitness goals', priority: 'high' },
      { title: 'Create workout schedule', priority: 'high' },
      { title: 'Plan meal prep and nutrition', priority: 'high' },
      { title: 'Track daily calories', priority: 'medium' },
      { title: 'Start with light exercises', priority: 'medium' },
      { title: 'Gradually increase intensity', priority: 'medium' },
      { title: 'Join a gym or fitness class', priority: 'medium' },
      { title: 'Find workout buddy', priority: 'low' },
      { title: 'Measure progress weekly', priority: 'medium' },
      { title: 'Reward milestones', priority: 'low' },
    ],
  },
]

// Pricing Plans
export const pricingPlans = [
  {
    id: 'free',
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Up to 10 tasks',
      'Basic task management',
      '1 workspace',
      'Email support',
    ],
    notIncluded: [
      'AI Task Generator',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    period: 'month',
    description: 'For professionals who want more',
    features: [
      'Unlimited tasks',
      'AI Task Generator',
      'Advanced analytics',
      'Unlimited workspaces',
      'Priority support',
      'Custom integrations',
      'API access',
      'Team collaboration',
    ],
    notIncluded: [],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: 49,
    period: 'month',
    description: 'For teams of all sizes',
    features: [
      'Everything in Pro',
      'Team management',
      'Admin controls',
      'Audit logs',
      'SSO integration',
      'Dedicated support',
      'Custom branding',
      'Advanced security',
    ],
    notIncluded: [],
    cta: 'Start Free Trial',
    popular: false,
  },
]

// Feature list for landing page
export const features = [
  {
    icon: 'Sparkles',
    title: 'AI Task Generator',
    description: 'Describe your goal and let AI create a structured task plan in seconds.',
  },
  {
    icon: 'LayoutDashboard',
    title: 'Smart Dashboard',
    description: 'Beautiful analytics showing your productivity stats and insights.',
  },
  {
    icon: 'Kanban',
    title: 'Kanban Board',
    description: 'Drag-and-drop task management with real-time updates.',
  },
  {
    icon: 'Lightbulb',
    title: 'AI Suggestions',
    description: 'Get intelligent recommendations for next actions based on your patterns.',
  },
  {
    icon: 'Bell',
    title: 'Smart Notifications',
    description: 'Stay on track with intelligent reminders and updates.',
  },
  {
    icon: 'Moon',
    title: 'Dark Mode',
    description: 'Easy on the eyes with our beautiful dark theme.',
  },
]

// Testimonials
export const testimonials = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Product Manager at TechCorp',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    content: 'TaskFlow AI has completely transformed how I manage projects. The AI task generator is like magic!',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Startup Founder',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'I used to struggle with task management. Now with TaskFlow, I have a clear roadmap for every project.',
  },
  {
    id: '3',
    name: 'Emily Watson',
    role: 'Freelance Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'The Kanban board is so intuitive and the dark mode is gorgeous. Best productivity app I have used.',
  },
]

// Navigation items
export const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

// Dashboard navigation items
export const dashboardNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { name: 'Tasks', href: '/tasks', icon: 'Kanban' },
]
