<script setup>
import { mdiAccessPoint } from '@mdi/js';

import { reactive, ref, computed, onMounted } from 'vue'
import { useModuleStore } from '@/stores/module'

import FormControl from '@/components/FormControl.vue'

const moduleStore = useModuleStore()

const moduleItems = ref([])
onMounted(async () => {
    await moduleStore.fetchModules()
    moduleItems.value = moduleStore.items.map(item => ({ id: item.id, label: item.name }))
    form.modules = moduleItems.value[0]
})

const form = reactive({
    modules: null,
})

defineProps({
    name: {
        type: String,
        default: 'module'
    },
})

</script>

<template>
    <FormControl v-model="form.modules" :options="moduleItems" :name="name" :icon="mdiAccessPoint"/>
</template>
