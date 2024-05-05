<script setup>
import { mdiCalendar } from '@mdi/js'
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import { useSemesterStore } from '@/stores/semester'

import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'

//operator config
const simulated_annealing = reactive({
  initial_temperature: 100,
  cooling_rate: 0.1,
  max_iteration: 1000,
  max_time: 60,
  max_time_without_improvement: 5
})

</script>

<template>
  <CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
    <CardBoxComponentHeader title="Konfigurasi Simulated Annealing" />
    <CardBoxComponentBody>
      <div class="grid grid-cols-1 gap-x-4 gap-y-1 xl:grid-cols-2">
        <FormField label="Suhu Awal" class="mb-0">
          <FormControl v-model="simulated_annealing.initial_temperature" name="initialTemperature" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Maksimum Iterasi" class="mb-0">
          <FormControl v-model="simulated_annealing.max_iteration" name="maxIteration" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Maksimum Waktu (detik)" class="mb-0">
          <FormControl v-model="simulated_annealing.max_time" name="maxTime" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Tingkat Pendinginan" class="mb-0">
          <FormControl v-model="simulated_annealing.cooling_rate" name="coolingRate" :icon="mdiCalendar" />
        </FormField>
        <FormField label="Maksimum Waktu Tanpa Perkembangan (detik)" class="mb-0">
          <FormControl v-model="simulated_annealing.max_time_without_improvement" name="maxTimeWithoutImprovement"
            :icon="mdiCalendar" />
        </FormField>
      </div>
    </CardBoxComponentBody>
    </CardBox>
</template>
