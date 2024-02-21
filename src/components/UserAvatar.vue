<script setup>
import { computed } from 'vue'

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  api: {
    type: String,
    default: 'avataaars'
  },
  frameShape: {
    type: String,
    default: 'rounded'
  }
})

const avatar = computed(
  () =>
    props.avatar ??
    `https://api.dicebear.com/7.x/${props.api}/svg?seed=${props.username.replace(
      /[^a-z0-9]+/gi,
      '-'
    )}.svg`
)

const username = computed(() => props.username)
</script>

<template>
  <div>
    <img
      :src="avatar"
      :alt="username"
      class="
        block
        h-full
        w-full
        max-w-full
        bg-gray-100
        dark:bg-slate-800"
      :class="`rounded-${frameShape}`"
    />
    <slot />
  </div>
</template>
