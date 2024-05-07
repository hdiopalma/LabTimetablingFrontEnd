<script setup>
import BaseIcon from '@/components/BaseIcon.vue'
import { mdiLoading } from '@mdi/js'

defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  small: Boolean
})
</script>

<template>
  <div
    class="inline-flex items-center capitalize leading-none"
    :class="[small ? 'text-xs' : 'text-sm']"
  >
    <BaseIcon
      v-if="icon"
      :path="loading ? mdiLoading : icon"
      h="h-4"
      w="w-4"
      :class="small ? 'mr-1' : 'mr-2'"
      :size="small ? 14 : null"
      :loading="loading"
    />
    <span>{{ label }}
    </span>
  </div>
</template>
