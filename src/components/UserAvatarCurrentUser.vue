<script setup>
import { useMainStore } from '@/stores/main'
import UserAvatar from '@/components/UserAvatar.vue'

const mainStore = useMainStore()

const props = defineProps({
  frameShape: {
    type: String,
    default: 'rounded'
  },
  layoutPosition: {
    type: String,
    default: ''
  }
})

</script>

<template>
  <UserAvatar :username="mainStore.userName" :avatar="mainStore.userAvatar" :frame-shape="frameShape" :class="layoutPosition">
    <slot />
  </UserAvatar>
</template>
