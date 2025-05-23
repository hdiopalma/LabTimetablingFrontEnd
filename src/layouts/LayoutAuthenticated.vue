<script setup>
//LayoutAuthenticated.vue
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/main'

import menuAside from '@/menuAside.js'
import menuNavBar from '@/menuNavBar.js'
import { useDarkModeStore } from '@/stores/darkMode.js'
import BaseIcon from '@/components/BaseIcon.vue'
import FormControl from '@/components/FormControl.vue'
import NavBar from '@/components/NavBar.vue'
import NavBarItemPlain from '@/components/NavBarItemPlain.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'

//misc
import SakuraFall from '@/components/Misc/SakuraFall.vue'
import UnderlayImage from '@/components/Misc/UnderlayImage.vue'
import AudioVisual from '@/components/Misc/AudioVisual.vue'

const layoutAsidePadding = 'xl:pl-60'

const darkModeStore = useDarkModeStore()
const mainStore = useMainStore()

const router = useRouter()

const isAsideMobileExpanded = ref(false)
const isAsideLgActive = ref(false)

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    darkModeStore.set()
  }
}

const bgImageClass = ref('bg-fixed bg-no-repeat bg-right-bottom')

</script>

<template>
  <!-- <UnderlayImage src="/assets/hutao.png" opacity="50" size="w-1/4" index="z-0" /> -->
  <!-- <UnderlayImage src="/assets/plum_tree.png" position="top-0 right-0" opacity="50" size="w-2/5" index="z-1" /> -->
  <div
  :class="{
    'overflow-hidden lg:overflow-visible': isAsideMobileExpanded
  }">
    <div :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
      >
      <NavBar :menu="menuNavBar" :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
        @menu-click="menuClick">
        <NavBarItemPlain display="flex lg:hidden" @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded">
          <BaseIcon :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain display="hidden lg:flex xl:hidden" @click.prevent="isAsideLgActive = true">
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain use-margin>
          <FormControl placeholder="Search (ctrl+k)" ctrl-k-focus transparent borderless />
        </NavBarItemPlain>
      </NavBar>
      
      <AsideMenu :is-aside-mobile-expanded="isAsideMobileExpanded" :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside" @menu-click="menuClick" @aside-lg-close-click="isAsideLgActive = false" />
        <!-- <AudioVisual/> -->
          <slot />
      <FooterBar> 

      </FooterBar>
    </div>

  </div>
  <!-- <SakuraFall /> -->
  
</template>