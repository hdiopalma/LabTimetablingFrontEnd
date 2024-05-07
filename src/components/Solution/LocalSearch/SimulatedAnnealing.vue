<script setup>
import { mdiCalendar } from '@mdi/js'
import { reactive, ref, computed, onMounted, defineEmits, defineModel } from 'vue'
import { useSolutionConfigurationStore } from '@/stores/solution_configuration'

import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'

const solutionConfigurationStore = useSolutionConfigurationStore()

//operator config
const simulated_annealing = solutionConfigurationStore.getSimulatedAnnealing

const onSimulatedAnnealingChange = () => {
  solutionConfigurationStore.setSimulatedAnnealing(simulated_annealing)
}

</script>

<template>
  <CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
    <CardBoxComponentHeader title="Konfigurasi Simulated Annealing" />
    <CardBoxComponentBody>

      <CardBox :has-component-layout="true" :is-nested="true" :nested-level="2" rounded="rounded-md">
        <CardBoxComponentBody>
          <p class="text-md text-slate-500">
            <b>Simulated Annealing</b> adalah algoritma optimasi yang mengikuti proses pendinginan logam. Algoritma ini
            mengikuti proses pendinginan logam yang dikenal sebagai proses annealing. Proses ini mengacu pada
            penurunan suhu secara perlahan untuk mengurangi energi dalam sistem. Seiring berjalannya iterasi, suhu akan
            turun
            pada rasio tertentu. Pada suhu tinggi, algoritma ini akan berfokus pada eksplorasi, dimana ia akan memiliki
            peluang
            besar untuk menerima solusi yang lebih buruk. Sebaliknya, pada suhu rendah, algoritma ini akan berfokus pada
            eksploitasi,
            dimana ia berfokus untuk menerima solusi yang paling baik. <br><br> Paling konsisten dari segi kecepatan dan
            hasil.
          </p>
        </CardBoxComponentBody>
      </CardBox>
      <br>

      <div class="grid grid-cols-1 gap-x-4 gap-y-1 xl:grid-cols-2">
        <FormField label="Suhu Awal" class="mb-0">
          <FormControl v-model="simulated_annealing.initial_temperature" name="initialTemperature"
            @change="onSimulatedAnnealingChange" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Maksimum Iterasi" class="mb-0">
          <FormControl v-model="simulated_annealing.max_iteration" name="maxIteration"
            @change="onSimulatedAnnealingChange" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Maksimum Waktu (detik)" class="mb-0">
          <FormControl v-model="simulated_annealing.max_time" name="maxTime" @change="onSimulatedAnnealingChange"
            :icon="mdiCalendar" />
        </FormField>
        <FormField label="Tingkat Pendinginan" class="mb-0">
          <FormControl v-model="simulated_annealing.cooling_rate" name="coolingRate"
            @change="onSimulatedAnnealingChange" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Maksimum Waktu Tanpa Perkembangan (detik)" class="mb-0">
          <FormControl v-model="simulated_annealing.max_time_without_improvement" name="maxTimeWithoutImprovement"
            @change="onSimulatedAnnealingChange" :icon="mdiCalendar" />
        </FormField>
      </div>
    </CardBoxComponentBody>
  </CardBox>
</template>
