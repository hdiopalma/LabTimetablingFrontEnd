<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'text-2xl'
  },
  font: {
    type: String,
    default: 'font-bold'
  }
})
</script>

<template>
  <div class="flex items-center justify-between mb-3">
    <h1 :class="size + ' ' + font">
      {{ title }}
    </h1>
    <slot />
  </div>
</template>
