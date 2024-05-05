<script setup>

import { mdiCalendar } from '@mdi/js';
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import { useSemesterStore } from '@/stores/semester'

import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import BaseDivider from '@/components/BaseDivider.vue'

import FitnessConfig from '@/components/Solution/Fitness/FitnessConfig.vue'
import OperatorConfig from '@/components/Solution/Operator/OperatorConfig.vue'

const algorithm = ref('genetic_local_search')

const config = ref({
    "max_iteration": 500,
    "population_size": 25,
    "elitism_size": 2,
})


</script>


<template>

    <FormField label="Algoritma Utama">
        <FormControl v-model="algorithm" :options="[
            { id: 'genetic_algorithm', label: 'Genetic Algorithm' },
            { id: 'genetic_local_search', label: 'Genetic Local Search' },
        ]" name="mainAlgorithm" :icon="mdiCalendar" />
    </FormField>

    <div class="grid grid-cols-1 gap-x-4 gap-y-0 md:grid-cols-3 xl:grid-cols-3">
        <FormField label="Jumlah Iterasi Maksimal">
            <FormControl v-model="config.max_iteration" type="number" name="maxIteration" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Ukuran Populasi">
            <FormControl v-model="config.population_size" type="number" name="populationSize" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Ukuran Elitisme">
            <FormControl v-model="config.elitism_size" type="number" name="elitismSize" :icon="mdiCalendar" />
        </FormField>
    </div>
    <BaseDivider />
    <CardBoxComponentTitle title="Konfigurasi Fitness" size="text-md" font="font-bold" />
    <FitnessConfig/>
    <BaseDivider />
    <CardBoxComponentTitle title="Konfigurasi Operator" size="text-md" font="font-bold" />
    <OperatorConfig />

</template>