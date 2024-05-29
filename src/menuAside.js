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
    to: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle
  },

]
