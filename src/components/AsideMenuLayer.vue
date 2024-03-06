<script setup>
import { mdiLogin, mdiClose } from '@mdi/js'
import { computed } from 'vue'
import AsideMenuList from '@/components/AsideMenuList.vue'
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import AsideMenuLogOut from '@/components/Auth/AsideMenuLogOut.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { useRouter } from 'vue-router'

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
  color: 'info',
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
  <aside
    id="aside"
    class="lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden"
  >
    <div class="aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900">
      <div class="aside-brand flex flex-row h-14 items-center justify-between dark:bg-slate-900">
        <div class="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
          <b class="font-black">One</b>
        </div>
        <button class="hidden lg:inline-block xl:hidden p-3" @click.prevent="asideLgCloseClick">
          <BaseIcon :path="mdiClose" />
        </button>
      </div>
      <div
        class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate]"
      >
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>

      <ul>
        <AsideMenuLogOut v-if="isAuthenticated" />
        <AsideMenuItem v-if="!isAuthenticated" :item="loginItem" @menu-click="loginClick" />
      </ul>
    </div>
  </aside>
</template>
