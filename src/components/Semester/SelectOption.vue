<script setup>

import { mdiCalendar } from '@mdi/js';
import { reactive, ref, computed, onMounted } from 'vue'
import { useSemesterStore } from '@/stores/semester'

import FormControl from '@/components/FormControl.vue'

const semesterStore = useSemesterStore()

const semesterItems = ref([])
onMounted(async () => {
    await semesterStore.fetchSemesters()
    semesterItems.value = semesterStore.items.map(item => ({ id: item.id, label: item.name }))
    form.items = semesterItems.value[0]
})

const form = reactive({
    items: null,
})

defineProps({
    name: {
        type: String,
        default: 'Semester'
    },
})

</script>

<template>
    <FormControl v-model="form.items" :options="semesterItems" :name="name" :icon="mdiCalendar"/>
</template>

