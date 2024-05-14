<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'bottom-0 right-0'
  },
  opacity: {
    type: String,
    default: '25'
  },
  size: {
    type: String,
    default: ''
  },
  index: {
    type: String,
    default: 'z-0'
  },
  relativePosition: {
    type: String,
    default: 'fixed'
  }
})

</script>

<template>
    <img alt="Underlay" class="underlay-image" 
    :class="position + ' opacity-' + opacity + ' ' + size + ' ' + index + ' ' + relativePosition"
    :src="src"/>
</template>

<style scoped>
    .underlay-image {
        pointer-events: none;
    }
</style>