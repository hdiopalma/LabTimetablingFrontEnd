<script setup>

import { mdiCalendar } from '@mdi/js';
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import { useSolutionConfigurationStore } from '@/stores/solution_configuration'

import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'

import Neighborhood from '@/components/Solution/LocalSearch/Neighborhood.vue'
import TabuSearch from '@/components/Solution/LocalSearch/TabuSearch.vue'
import SimulatedAnnealing from '@/components/Solution/LocalSearch/SimulatedAnnealing.vue'

const solutionConfigurationStore = useSolutionConfigurationStore()


const algorithm = ref(solutionConfigurationStore.getLocalSearchAlgorithm)
const local_search_option = [
    { id: 'simulated_annealing', label: 'Simulated Annealing' },
    { id: 'tabu_search', label: 'Tabu Search' }
]

const onConfigChange = () => {
    solutionConfigurationStore.setLocalSearchAlgorithm(algorithm.value)
}

</script>


<template>

    <FormField label="Algoritma Local Search">
        <FormControl v-model="algorithm" :options="local_search_option" @change="onConfigChange"
         name="localSearchAlgorithm" :icon="mdiCalendar" />
    </FormField>

    <BaseDivider />

    <TabuSearch v-if="algorithm === 'tabu_search'" />
    <SimulatedAnnealing v-if="algorithm === 'simulated_annealing'" />

    <BaseDivider />
    <Neighborhood />



</template>