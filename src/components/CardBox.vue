<script setup>
import { computed, useSlots } from 'vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'
import CardBoxComponentFooter from '@/components/CardBoxComponentFooter.vue'

const props = defineProps({
  rounded: {
    type: String,
    default: 'rounded-2xl'
  },
  flex: {
    type: String,
    default: 'flex-col'
  },
  hasFooter: {
    type: Boolean,
    default: true},
  hasComponentLayout: Boolean,
  hasTable: Boolean,
  isForm: Boolean,
  isHoverable: Boolean,
  isModal: Boolean,
  isScrollable: Boolean,
  wide: Boolean,
  isNested: Boolean,
  nestedLevel: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['submit'])

const slots = useSlots()

const hasFooterSlot = computed(() => slots.footer && !!slots.footer())

//Manage bg color based on nested level, if even then slightly darker, if odd then regular, if zero then regular
const bgClass = computed(() => {
  return props.isNested ? (props.nestedLevel % 2 === 1 ? 'dark:bg-slate-900/70 bg-slate-100' : 'dark:bg-slate-900/70 bg-white') : 'dark:bg-slate-900/60 bg-white'
})

const componentClass = computed(() => {
  const base = [
    props.rounded,
    props.flex,
    props.isModal ? 'dark:bg-slate-900' : bgClass.value,
    props.isScrollable ? 'overflow-y-auto' : 'overflow-hidden',
    props.isNested ? `ml-${props.nestedLevel}` : '',
    props.isNested ? 'border-l-4 dark:border-slate-800' : '',
  ]

  if (props.isHoverable) {
    base.push('hover:shadow-lg transition-shadow duration-500')
  }

  return base
})

const submit = (event) => {
  emit('submit', event)
}
</script>

<template>
  <component
    :is="isForm ? 'form' : 'div'"
    :class="componentClass"
    class="bg-white flex"
    @submit="submit"
  >
    <slot v-if="hasComponentLayout" />
    <template v-else>
      <CardBoxComponentBody :no-padding="hasTable">
        <slot />
      </CardBoxComponentBody>
      <CardBoxComponentFooter v-if="hasFooterSlot && props.hasFooter">
        <slot name="footer" />
      </CardBoxComponentFooter>
    </template>
  </component>
</template>
