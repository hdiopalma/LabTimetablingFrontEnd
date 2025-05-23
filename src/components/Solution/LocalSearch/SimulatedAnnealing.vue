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
      <div class="grid grid-cols-1 gap-x-4 gap-y-1 xl:grid-cols-2">
        <FormField label="Suhu Awal" class="mb-0">
          <FormControl v-model="simulated_annealing.initial_temperature" name="initialTemperature" type="number"
            @change="onSimulatedAnnealingChange" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Tingkat Pendinginan" class="mb-0">
          <FormControl v-model="simulated_annealing.cooling_rate" name="coolingRate" type="number" min="0.01"
            max="0.99"
            step="0.001"
            @change="onSimulatedAnnealingChange" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Maksimum Iterasi" class="mb-0">
          <FormControl v-model="simulated_annealing.max_iteration" name="maxIteration" type="number"
            @change="onSimulatedAnnealingChange" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Maksimum Waktu (detik)" class="mb-0">
          <FormControl v-model="simulated_annealing.max_time" name="maxTime" @change="onSimulatedAnnealingChange" type="number"
            :icon="mdiCalendar" />
        </FormField>
        <FormField label="Maksimum Iterasi Tanpa Perkembangan" class="mb-0">
          <FormControl v-model="simulated_annealing.max_iteration_without_improvement" type="number"
            name="maxIterationWithoutImprovement" @change="onSimulatedAnnealingChange" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Maksimum Waktu Tanpa Perkembangan (detik)" class="mb-0">
          <FormControl v-model="simulated_annealing.max_time_without_improvement" name="maxTimeWithoutImprovement" type="number"
            @change="onSimulatedAnnealingChange" :icon="mdiCalendar" />
        </FormField>
      </div>
    </CardBoxComponentBody>
  </CardBox>
</template>
