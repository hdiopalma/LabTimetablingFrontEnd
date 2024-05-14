<script setup>
import { mdiLogin, mdiClose } from '@mdi/js'
import { computed } from 'vue'
import AsideMenuList from '@/components/AsideMenuList.vue'
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import AsideMenuLogOut from '@/components/Auth/AsideMenuLogOut.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue'
import UnderlayImage from './Misc/UnderlayImage.vue'

import { useAuthService } from '@/services/authService'
import router from '@/router'

const isAuthenticated = computed(() => useAuthService().isAuthenticated())

defineProps({
  menu: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['menu-click', 'aside-lg-close-click'])

const loginItem = computed(() => ({
  label: 'Login',
  icon: mdiLogin,
  color: 'info'
}))

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

const loginClick = (event, item) => {
  emit('menu-click', event, item)
  router.push('/login')
}

const asideLgCloseClick = (event) => {
  emit('aside-lg-close-click', event)
}
</script>

<template>
  <aside id="aside" class="w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden">
    <div class="aside flex-1 flex flex-col overflow-hidden dark:bg-slate-900">
      <UnderlayImage src="/assets/plum_branch.png" position="bottom-12 left-0" opacity="50" size="w-96" relative-position="absolute" />
      <div class="aside-brand flex flex-row h-36 items-center justify-between dark:bg-slate-900 overflow-hidden">
        <div class="relative">
          <div class="flex flex-row h-auto items-center justify-between dark:bg-slate-900 overflow-hidden relative">
            <UserAvatarCurrentUser class="w-auto h-auto" />
            <!-- black box for vignette effect -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-800 dark:from-slate-900 from-15% to-transparent">
            </div>
          </div>
          <div class="text-center absolute w-full top-1/2 transform -translate-y-1/2 text-xl text-white">
            <b class="font-black">LAB JTE</b>
          </div>
        </div>
        <!-- <button class="hidden lg:inline-block xl:hidden p-3" @click.prevent="asideLgCloseClick">
          <BaseIcon :path="mdiClose" />
        </button> -->
      </div>

      <div class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate]">
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>

      <ul>
        <AsideMenuLogOut v-if="isAuthenticated" class="z-20" />
        <AsideMenuItem v-if="!isAuthenticated" :item="loginItem" @menu-click="loginClick" />
      </ul>
    </div>
  </aside>
</template>
