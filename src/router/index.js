import { createRouter, createWebHashHistory } from 'vue-router'
import { useRouteGuard } from '@/services/routeGuard'

import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'

const routes = [
  {
    meta: {
      title: 'Select style'
    },
    path: '/',
    name: 'style',
    component: Style
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/dashboard',
    name: 'dashboard',
    component: Home
  },

  {
    meta: {
      title: 'Semesters'
    },
    path: '/semesters',
    name: 'semester.index',
    component: () => import('@/views/Semester/Index.vue'),
  },

  {
    meta: {
      title: 'Input Semester',
      requiresAuth: true
    },
    path: '/semesters/input',
    name: 'semester.input',
    component: () => import('@/views/Semester/Input.vue')
  },

  {
    meta:{
      title: 'Show Semester',
      requiresAuth: true
    },
    path: '/semesters/:id',
    name: 'semester.show',
    component: () => import('@/views/Semester/Show.vue'),
    props: true
  },

  {
    meta: {
      title: 'Labs'
    },
    path: '/labs',
    name: 'lab.index',
    component: () => import('@/views/Lab/Index.vue')
  },
  {
    meta: {
      title: 'Input Lab',
      requiresAuth: true
    },
    path: '/labs/input',
    name: 'lab.input',
    component: () => import('@/views/Lab/Input.vue')
  },
  {
    meta: {
      title: 'Show Lab',
      requiresAuth: true
    },
    path: '/labs/:id',
    name: 'lab.show',
    component: () => import('@/views/Lab/Show.vue'),
    props: true
  },


  {
    meta: {
      title: 'Assistants'
    },
    path: '/assistants',
    name: 'assistant.index',
    component: () => import('@/views/Assistant/Index.vue')
  },
  {
    meta: {
      title: 'Input Assistant',
      requiresAuth: true
    },
    path: '/assistants/input',
    name: 'assistant.input',
    component: () => import('@/views/Assistant/Input.vue')
  },
  {
    meta: {
      title: 'Show Assistant',
      requiresAuth: true
    },
    path: '/assistants/:id',
    name: 'assistant.show',
    component: () => import('@/views/Assistant/Show.vue'),
    props: true
  },

  {
    meta: {
      title: 'Participants'
    },
    path: '/participants',
    name: 'participant.index',
    component: () => import('@/views/Participant/Index.vue')
  },
  {
    meta: {
      title: 'Input Participant',
      requiresAuth: true
    },
    path: '/participants/input',
    name: 'participant.input',
    component: () => import('@/views/Participant/Input.vue')
  },
  {
    meta: {
      title: 'Show Participant',
      requiresAuth: true
    },
    path: '/participants/:id',
    name: 'participant.show',
    component: () => import('@/views/Participant/Show.vue'),
    props: true
  },

  {
    meta: {
      title: 'Modules'
    },
    path: '/modules',
    name: 'module.index',
    component: () => import('@/views/Module/Index.vue')
  },
  {
    meta: {
      title: 'Input Module',
      requiresAuth: true
    },
    path: '/modules/input',
    name: 'module.input',
    component: () => import('@/views/Module/Input.vue')
  },
  {
    meta: {
      title: 'Show Module',
      requiresAuth: true
    },
    path: '/modules/:id',
    name: 'module.show',
    component: () => import('@/views/Module/Show.vue'),
    props: true
  },

  {
    meta: {
      title: 'Chapters'
    },
    path: '/chapters',
    name: 'chapter.index',
    component: () => import('@/views/Chapter/Index.vue')
  },
  {
    meta: {
      title: 'Input Chapter',
      requiresAuth: true
    },
    path: '/chapters/input',
    name: 'chapter.input',
    component: () => import('@/views/Chapter/Input.vue')
  },
  {
    meta: {
      title: 'Show Chapter',
      requiresAuth: true
    },
    path: '/chapters/:id',
    name: 'chapter.show',
    component: () => import('@/views/Chapter/Show.vue'),
    props: true
  },

  {
    meta: {
      title: 'Groups'
    },
    path: '/groups',
    name: 'group.index',
    component: () => import('@/views/Group/Index.vue')
  },

  {
    meta: {
      title: 'Solution'
    },
    path: '/solutions',
    name: 'solution.index',
    component: () => import('@/views/Solution/Index.vue')
  },
  {
    meta: {
      title: 'Show Solution',
      requiresAuth: true
    },
    path: '/solutions/:id',
    name: 'solution.show',
    component: () => import('@/views/Solution/Show.vue'),
    props: true
  },
  {
    meta: {
      title: 'Input Solution',
      requiresAuth: true
    },
    path: '/solutions/input',
    name: 'solution.input',
    component: () => import('@/views/Solution/Input.vue')
  },


  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    component: () => import('@/views/TablesView.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/FormsView.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    meta: {
      title: 'Ui'
    },
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/UiView.vue')
  },
  {
    meta: {
      title: 'Responsive layout'
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/ResponsiveView.vue')
  },

  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    meta: { layout: 'guest' },
    component: () => import('@/views/LoginView.vue')
  },
  {
    meta: {
      title: 'Logout'
    },
    path: '/logout',
    name: 'logout',
    component: () => import('@/components/Auth/LogOut.vue')
  },


  {
    meta: {
      title: 'Error'
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const routeGuard = useRouteGuard()
  routeGuard.requireAuth(to, from, next)
})

export default router
