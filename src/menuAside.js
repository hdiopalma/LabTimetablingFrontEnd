import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact
} from '@mdi/js'

export default [
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard'
  },

  {
    label: 'Data Management',
    icon: mdiViewList,
    menu: [
      {
        to: '/semesters',
        label: 'Semesters',
        icon: mdiViewList
      },

      {
        to: '/labs',
        label: 'Labs',
        icon: mdiViewList
      },

      {
        to: '/assistants',
        label: 'Assistants',
        icon: mdiViewList
      },

      {
        to: '/participants',
        label: 'Participants',
        icon: mdiViewList
      },

      {
        to: '/modules',
        label: 'Modules',
        icon: mdiViewList
      },

      {
        to: '/chapters',
        label: 'Chapters',
        icon: mdiViewList
      },

      {
        to: '/groups',
        label: 'Groups',
        icon: mdiViewList
      },

    ]
  },

  {
    to: '/solutions',
    label: 'Solution',
    icon: mdiTable
  },


  {
    to: '/tables',
    label: 'Tables',
    icon: mdiTable
  },
  {
    to: '/forms',
    label: 'Forms',
    icon: mdiSquareEditOutline
  },
  {
    to: '/ui',
    label: 'UI',
    icon: mdiTelevisionGuide
  },
  {
    to: '/responsive',
    label: 'Responsive',
    icon: mdiResponsive
  },
  {
    to: '/',
    label: 'Styles',
    icon: mdiPalette
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle
  },
  {
    to: '/login',
    label: 'Login',
    icon: mdiLock
  },
  {
    to: '/error',
    label: 'Error',
    icon: mdiAlertCircle
  },
  {
    label: 'Dropdown',
    icon: mdiViewList,
    menu: [
      {
        label: 'Item One'
      },
      {
        label: 'Item Two'
      }
    ]
  },
  {
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    label: 'GitHub',
    icon: mdiGithub,
    target: '_blank'
  },
  {
    href: 'https://github.com/justboil/admin-one-react-tailwind',
    label: 'React version',
    icon: mdiReact,
    target: '_blank'
  }
]
