<script setup>
import { mdiCalendar } from '@mdi/js'
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import { useSolutionConfigurationStore } from '@/stores/solution_configuration'

import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'

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
    <FormControl
      v-model="algorithm"
      :options="local_search_option"
      @change="onConfigChange"
      name="localSearchAlgorithm"
      :icon="mdiCalendar"
    />
  </FormField>

  <CardBox :has-component-layout="true" :is-nested="true" rounded="rounded-md">
    <CardBoxComponentBody v-if="algorithm === 'simulated_annealing'">
      <p class="text-md text-slate-500 text-justify">
        <b>Simulated Annealing</b> adalah algoritma optimasi yang mengikuti proses pendinginan
        logam. Algoritma ini mengikuti proses pendinginan logam yang dikenal sebagai proses
        annealing. Proses ini mengacu pada penurunan suhu secara perlahan untuk mengurangi energi
        dalam sistem. Seiring berjalannya iterasi, suhu akan turun pada rasio tertentu. Pada suhu
        tinggi, algoritma ini akan berfokus pada eksplorasi, dimana ia akan memiliki peluang besar
        untuk menerima solusi yang lebih buruk. Sebaliknya, pada suhu rendah, algoritma ini akan
        berfokus pada eksploitasi, dimana ia berfokus untuk menerima solusi terbaik.
      </p>
    </CardBoxComponentBody>
    <CardBoxComponentBody v-if="algorithm === 'tabu_search'">
      <p class="text-md text-slate-500 p-4">
        <b>Tabu Search</b> adalah algoritma optimasi yang mengikuti proses pencarian yang
        menghindari solusi yang sudah pernah ditemukan sebelumnya dengan memanfaatkan daftar tabu.
        Setiap solusi akan disimpan didalam daftar tabu hingga batas tertentu, sehingga solusi yang
        sama tidak akan ditemukan kembali.
      </p>
    </CardBoxComponentBody>
  </CardBox>
  <BaseDivider />

  <TabuSearch v-if="algorithm === 'tabu_search'" />
  <SimulatedAnnealing v-if="algorithm === 'simulated_annealing'" />

  <BaseDivider />
  <Neighborhood />
</template>
