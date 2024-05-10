<script setup>
import { RouterView } from 'vue-router'
import LayoutAuthenticatedVue from './layouts/LayoutAuthenticated.vue';
import LayoutGuestVue from './layouts/LayoutGuest.vue';

//insert script notification.js

const getLayout = (route) => {
  if (route.meta.layout === 'guest') {
    return LayoutGuestVue
  }
  return LayoutAuthenticatedVue
}

</script>

<template>

  <RouterView v-slot="{ Component, route }">
      <component :is="getLayout(route)">
        <Transition name="fade-slide" mode="out-in" appear>
          
          <Component :is="Component" />
        
        </Transition>
      </component>
  </RouterView>
</template>

<style>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(20px);
}

/* Fade Slide transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}

.fade-slide-enter,
.fade-slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.fade-slide-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
