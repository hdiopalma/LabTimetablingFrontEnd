<script setup>

import { mdiCalendar } from '@mdi/js';
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import { useSemesterStore } from '@/stores/semester'

import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'

import Neighborhood from '@/components/Solution/LocalSearch/Neighborhood.vue'
import TabuSearch from '@/components/Solution/LocalSearch/TabuSearch.vue'
import SimulatedAnnealing from '@/components/Solution/LocalSearch/SimulatedAnnealing.vue'

const algorithm = ref('simulated-annealing')
const localSearchAlgorithm = [
    { id: 'simulated-annealing', label: 'Simulated Annealing' },
    { id: 'tabu-search', label: 'Tabu Search' }
]

const simulatedAnnealing = ref({
    initial_temperature: 100,
    cooling_rate: 0.1,
    max_iteration: 1000,
    max_time: 60
})

const tabuSearch = ref({
    tabu_list_size: 50,
    max_iteration: 1000,
    max_time: 60,
    max_iteration_without_improvement: 100,
    max_time_without_improvement: 5
})

</script>


<template>

    <FormField label="Algoritma Local Search">
        <FormControl v-model="algorithm" :options="localSearchAlgorithm"
         name="localSearchAlgorithm" :icon="mdiCalendar" />
    </FormField>

    <BaseDivider />

    <TabuSearch v-if="algorithm === 'tabu-search'" />
    <SimulatedAnnealing v-if="algorithm === 'simulated-annealing'" />

    <BaseDivider />
    <Neighborhood />



</template>