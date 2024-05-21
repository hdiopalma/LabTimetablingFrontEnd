<script setup>

import { mdiCalendar, mdiInformation } from '@mdi/js';
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import { useSemesterStore } from '@/stores/semester'
import { useSolutionConfigurationStore } from '@/stores/solution_configuration'

import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'

import FitnessConfig from '@/components/Solution/Fitness/FitnessConfig.vue'
import OperatorConfig from '@/components/Solution/Operator/OperatorConfig.vue'

import LocalSearchConfig from '@/components/Solution/LocalSearch/LocalSearchConfig.vue'

const solutionConfigurationStore = useSolutionConfigurationStore()
const algorithm_config = solutionConfigurationStore.getAlgorithm

const algorithm = ref(algorithm_config.algorithm)
const config = ref({
    "max_iteration": algorithm_config.config.max_iteration,
    "population_size": algorithm_config.config.population_size,
    "elitism_size": algorithm_config.config.elitism_size,
})

const algorithmOptions = [
    { id: 'genetic_algorithm', label: 'Genetic Algorithm' },
    { id: 'genetic_local_search', label: 'Hybrid Genetic Algorithm + Local Search' },
]

const onConfigChange = () => {
    solutionConfigurationStore.setAlgorithmConfig({
        algorithm: algorithm.value,
        config: config.value
    })
}

</script>

<template>
    <CardBox :has-component-layout="true">
        <div>
            <CardBoxComponentHeader title="Konfigurasi Algoritma" :buttonIcon="mdiInformation" />
            <CardBoxComponentBody :no-padding="false">
                <FormField label="Algoritma Utama">
                    <FormControl v-model="algorithm" :options="algorithmOptions" name="mainAlgorithm" @change="onConfigChange"
                        :icon="mdiCalendar" />
                </FormField>
                <CardBox :has-component-layout="true" :is-nested="true" :nested-level="3" rounded="rounded-md" v-if="algorithm == 'genetic_algorithm'">
                    <CardBoxComponentBody>
                        <p class="text-md text-slate-500"><b>Algoritma Genetika</b> menggunakan prisinsip seleksi alami untuk
                            memilih solusi akhir terbaik. Algortima akan membuat populasi awal sebagai nenek moyang
                            pertama, lalu berdasarkan populasi tersebut akan dilakukan berbagai kawin silang dan seleksi
                            berdasarkan nilai fitness terbaik untuk mendapatkan solusi akhir. </p>
                    </CardBoxComponentBody>
                </CardBox>
                <CardBox :has-component-layout="true" :is-nested="true" :nested-level="3" rounded="rounded-md" v-if="algorithm == 'genetic_local_search'">
                    <CardBoxComponentBody>
                        <p class="text-md text-slate-500"><b>Hybrid Genetic Algorithm + Local Search</b> merupakan kombinasi
                            algoritma genetika dengan algoritma pencarian lokal. Algoritma ini akan melakukan pencarian
                            lokal pada solusi terbaik yang dihasilkan oleh algoritma genetika untuk mengeksplorasi dan mengeksploitasi guna mendapatkan solusi yang lebih baik.</p>
                    </CardBoxComponentBody>
                </CardBox>
                <br>
                <div class="grid grid-cols-1 gap-x-4 gap-y-0 md:grid-cols-3 xl:grid-cols-3">
                    <FormField label="Jumlah Iterasi Maksimal">
                        <FormControl v-model="config.max_iteration" type="number" name="maxIteration" @change="onConfigChange"
                            :icon="mdiCalendar" />
                    </FormField>
                    <FormField label="Ukuran Populasi">
                        <FormControl v-model="config.population_size" type="number" name="populationSize" @change="onConfigChange"
                            :icon="mdiCalendar" />
                    </FormField>
                    <FormField label="Ukuran Elitisme">
                        <FormControl v-model="config.elitism_size" type="number" name="elitismSize" @change="onConfigChange"
                            :icon="mdiCalendar" />
                    </FormField>
                </div>
                <BaseDivider />
                <CardBoxComponentTitle title="Konfigurasi Fitness" size="text-md" font="font-bold" />
                <FitnessConfig />
                <BaseDivider />
                <CardBoxComponentTitle title="Konfigurasi Operator" size="text-md" font="font-bold" />
                <OperatorConfig />
            </CardBoxComponentBody>
        </div>
    </CardBox>
    <BaseDivider />
    <CardBox :has-component-layout="true" v-if="algorithm === 'genetic_local_search'">
        <div>
            <CardBoxComponentHeader title="Konfigurasi Local Search" />
            <CardBoxComponentBody :no-padding="false">
                <LocalSearchConfig />
            </CardBoxComponentBody>
        </div>
    </CardBox>
</template>