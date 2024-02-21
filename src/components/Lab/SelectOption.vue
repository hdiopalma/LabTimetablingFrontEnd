<script setup>
import { mdiAccessPoint } from '@mdi/js';

import { reactive, ref, computed, onMounted } from 'vue'
import { useLabStore } from '@/stores/lab'

import FormControl from '@/components/FormControl.vue'

const labStore = useLabStore()

const labsItems = ref([])
onMounted(async () => {
    await labStore.fetchLabs()
    labsItems.value = labStore.items.map(item => ({ id: item.id, label: item.name }))
    form.labs = labsItems.value[0]
})

const form = reactive({
    labs: null,
})

defineProps({
    name: {
        type: String,
        default: 'Lab'
    },
})

</script>

<template>
    <FormControl v-model="form.labs" :options="labsItems" :name="name" :icon="mdiAccessPoint"/>
</template>
