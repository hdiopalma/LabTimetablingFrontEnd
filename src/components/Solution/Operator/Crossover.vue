<script setup>
import { mdiCalendar } from '@mdi/js'
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import { useSolutionConfigurationStore } from '@/stores/solution_configuration'

import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'

//Store
const solutionConfigurationStore = useSolutionConfigurationStore()
const crossover = ref(solutionConfigurationStore.getCrossover)
const onCrossoverChange = () => {
  solutionConfigurationStore.setCrossover(crossover.value)
  console.log(solutionConfigurationStore.getCrossover)
}

function activeLabel(bool) {
  return bool ? '' : ''
}

function activeColor(bool) {
  return bool ? 'text-slate-900 font-medium' : 'text-slate-500'
}
</script>

<template>
  <CardBox
    :has-component-layout="true"
    :is-nested="true"
    :nested-level="1"
    rounded="rounded-md"
    is-hoverable
  >
    <CardBoxComponentHeader title="Konfigurasi Crossover" />
    <CardBoxComponentBody>
      <div class="grid grid-cols-1 gap-x-4 gap-y-4 xl:grid-cols-3 mb-4">
        <FormCheckRadioGroup
          v-model="crossover.single_point"
          name="crossover"
          type="switch"
          :options="{
            single_point: 'Single Point ' + activeLabel(crossover.single_point)
          }"
          :label-color="activeColor(crossover.single_point)"
            @change="onCrossoverChange"
        />
        <FormCheckRadioGroup
          v-model="crossover.two_point"
          name="crossover"
          type="switch"
          :options="{
            two_point: 'Two Point ' + activeLabel(crossover.two_point)
          }"
          :label-color="activeColor(crossover.two_point)"
            @change="onCrossoverChange"
        />
        <FormCheckRadioGroup
          v-model="crossover.uniform"
          name="crossover"
          type="switch"
          :options="{
            uniform: 'Uniform ' + activeLabel(crossover.uniform)
          }"
          :label-color="activeColor(crossover.uniform)"
          @change="onCrossoverChange"
        />
      </div>
      <div class="grid grid-cols-1 gap-x-4 gap-y-4 xl:grid-cols-2">
        <FormField label="Probabilitas Crossover" class="mb-0">
          <FormControl
            v-model="crossover.crossover_probability"
            name="crossoverProbability"
            :icon="mdiCalendar"
            @change="onCrossoverChange"
            type="number"
            min="0"
            max="1"
            step="0.01"
          />
        </FormField>
        <FormField label="Probabilitas Uniform" v-if="crossover.uniform">
          <FormControl
            v-model="crossover.uniform_probability"
            name="uniformProbability"
            :icon="mdiCalendar"
            @change="onCrossoverChange"
            type="number"
            min="0"
            max="1"
            step="0.01"
          />
        </FormField>
      </div>

      <CardBox :has-component-layout="true" :is-nested="true" :nested-level="2" rounded="rounded-md" class="mt-4">
                <CardBoxComponentBody>
                    <p class="text-md text-slate-500"><b>Crossover</b> atau <b>kawin silang</b> menentukan bagaimana dua orang tua (parent) akan menghasilkan anak (child).
                        <br>
                        Jika dipilih lebih dari satu metode, maka metode yang dipilih akan dijalankan secara random pada tiap generasi.
                    </p>
                </CardBoxComponentBody>
    </CardBox>

    </CardBoxComponentBody>
  </CardBox>
</template>
