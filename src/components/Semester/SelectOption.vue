<script setup>

import { mdiCalendar } from '@mdi/js';
import { reactive, ref, computed, onMounted , defineEmits} from 'vue'
import { useSemesterStore } from '@/stores/semester'

import FormControl from '@/components/FormControl.vue'

const semesterStore = useSemesterStore()

const semesterItems = ref([])
onMounted(async () => {
    await semesterStore.fetchSemesters()
    semesterItems.value = semesterStore.items.map(item => ({ id: item.id, label: item.name }))
    if (computedValue.value === '') {
        computedValue.value = semesterItems.value[0].id
    }
    console.log(computedValue.value)
})

const props = defineProps({
    name: {
        type: String,
        default: 'semester',
    },
    modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: ''
  },
})

const emit = defineEmits(['update:modelValue'])

// alert parent when selected value is changed
const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

</script>

<template>
    <FormControl v-model="computedValue"
    :options="semesterItems" 
    :name="props.name"
    :icon="mdiCalendar"/>
</template>

