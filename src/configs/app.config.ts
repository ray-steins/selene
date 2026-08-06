const APP_DATA = {
  name: 'Selene',
  version: '1.0'
} as const

export const ROUTES = {
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup'
  },
  dashboard: {
    base: '/dashboard',
    assignments: '/dashboard/assignments',
    classes: '/dashboard/classes'
  }
} as const

export const APP_NAVIGATION_ROUTES = {
  dashboard: {
    base: {
      name: 'Dashboard',
      path: ROUTES.dashboard.base,
    },
    assignments: {
      name: 'Assignments',
      path: ROUTES.dashboard.assignments
    },
    classes: {
      name: 'Classes',
      path: ROUTES.dashboard.classes
    }
  }
} as const;