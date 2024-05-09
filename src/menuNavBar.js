import {
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiGithub,
  mdiReact,
  mdiLogin,
  mdiBell,
} from '@mdi/js'

export default [
  {
    icon: mdiBell,
    label: 'Notifications',
    isDesktopNoLabel: true,
    isNotification: true,
    needAuth: true
  },
  {
    icon: mdiMenu,
    label: 'Semester Aktif',
    needAuth: true,
    menu: [
      {
        icon: mdiClockOutline,
        label: 'Item One',
      },
      {
        icon: mdiCloud,
        label: 'Item Two'
      },
      {
        isDivider: true
      },
      {
        icon: mdiCrop,
        label: 'Item Last'
      }
    ]
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    isCurrentUser: true,
    needAuth: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        to: '/profile',
        needAuth: true
      },
      {
        icon: mdiCogOutline,
        label: 'Settings',
        needAuth: true
      },
      {
        icon: mdiEmail,
        label: 'Messages',
        needAuth: true
      },
      {
        isDivider: true
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        isLogout: true,
        needAuth: true
      }
    ]
  },
  
  // {
  //   icon: mdiLogout,
  //   label: 'Log out',
  //   isDesktopNoLabel: true,
  //   isLogout: true,
  //   needAuth: true
  // },
  {
    icon: mdiLogin,
    label: 'Log In',
    isDesktopNoLabel: false,
    needAuth: false,
    to: '/login'
  }
]