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
    name: 'semesters',
    component: () => import('@/views/Semester/Index.vue'),
  },

  {
    meta: {
      title: 'Input Semester',
      requiresAuth: true
    },
    path: '/semesters/input',
    name: 'inputSemester',
    component: () => import('@/views/Semester/Input.vue')
  },

  {
    meta:{
      title: 'Show Semester',
      requiresAuth: true
    },
    path: '/semesters/:id',
    name: 'showSemester',
    component: () => import('@/views/Semester/Show.vue'),
    props: true
  },

  {
    meta: {
      title: 'Labs'
    },
    path: '/labs',
    name: 'labs',
    component: () => import('@/views/Lab/Index.vue')
  },
  {
    meta: {
      title: 'Input Lab',
      requiresAuth: true
    },
    path: '/labs/input',
    name: 'inputLab',
    component: () => import('@/views/Lab/Input.vue')
  },
  {
    meta: {
      title: 'Show Lab',
      requiresAuth: true
    },
    path: '/labs/:id',
    name: 'showLab',
    component: () => import('@/views/Lab/Show.vue'),
    props: true
  },


  {
    meta: {
      title: 'Assistants'
    },
    path: '/assistants',
    name: 'assistants',
    component: () => import('@/views/Assistant/Index.vue')
  },
  {
    meta: {
      title: 'Input Assistant',
      requiresAuth: true
    },
    path: '/assistants/input',
    name: 'inputAssistant',
    component: () => import('@/views/Assistant/Input.vue')
  },
  {
    meta: {
      title: 'Show Assistant',
      requiresAuth: true
    },
    path: '/assistants/:id',
    name: 'showAssistant',
    component: () => import('@/views/Assistant/Show.vue'),
    props: true
  },

  {
    meta: {
      title: 'Participants'
    },
    path: '/participants',
    name: 'participants',
    component: () => import('@/views/Participant/Index.vue')
  },
  {
    meta: {
      title: 'Input Participant',
      requiresAuth: true
    },
    path: '/participants/input',
    name: 'inputParticipant',
    component: () => import('@/views/Participant/Input.vue')
  },
  {
    meta: {
      title: 'Show Participant',
      requiresAuth: true
    },
    path: '/participants/:id',
    name: 'showParticipant',
    component: () => import('@/views/Participant/Show.vue'),
    props: true
  },

  {
    meta: {
      title: 'Modules'
    },
    path: '/modules',
    name: 'modules',
    component: () => import('@/views/Module/Index.vue')
  },
  {
    meta: {
      title: 'Input Module',
      requiresAuth: true
    },
    path: '/modules/input',
    name: 'inputModule',
    component: () => import('@/views/Module/Input.vue')
  },
  {
    meta: {
      title: 'Show Module',
      requiresAuth: true
    },
    path: '/modules/:id',
    name: 'showModule',
    component: () => import('@/views/Module/Show.vue'),
    props: true
  },

  {
    meta: {
      title: 'Chapters'
    },
    path: '/chapters',
    name: 'chapters',
    component: () => import('@/views/Chapter/Index.vue')
  },
  {
    meta: {
      title: 'Input Chapter',
      requiresAuth: true
    },
    path: '/chapters/input',
    name: 'inputChapter',
    component: () => import('@/views/Chapter/Input.vue')
  },
  {
    meta: {
      title: 'Show Chapter',
      requiresAuth: true
    },
    path: '/chapters/:id',
    name: 'showChapter',
    component: () => import('@/views/Chapter/Show.vue'),
    props: true
  },

  {
    meta: {
      title: 'Groups'
    },
    path: '/groups',
    name: 'groups',
    component: () => import('@/views/Group/Index.vue')
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
