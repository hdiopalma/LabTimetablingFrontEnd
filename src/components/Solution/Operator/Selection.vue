<script setup>
import { mdiCalendar } from '@mdi/js'
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import { useSolutionConfigurationStore } from '@/stores/solution_configuration'

import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'

//Store
//Store
const solutionConfigurationStore = useSolutionConfigurationStore()

//operator config
const selection = ref(solutionConfigurationStore.getSelection)

const onSelectionChange = () => {
  solutionConfigurationStore.setSelection(selection.value)
}

function activeLabel(bool) {
  return bool ? '' : ''
}
function activeColor(bool) {
  return bool ? 'text-slate-900 font-medium' : 'text-slate-500'
}
</script>

<template>
  <CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
    <CardBoxComponentHeader title="Konfigurasi Seleksi" />
    <CardBoxComponentBody>
      <div class="grid grid-cols-1 gap-x-4 gap-y-4 xl:grid-cols-2 mb-4">
        <FormCheckRadioGroup
          v-model="selection.roulette_wheel"
          name="selection"
          type="switch"
          :options="{
            roulette_wheel: 'Roulette Wheel ' + activeLabel(selection.roulette_wheel)
          }"
          :label-color="activeColor(selection.roulette_wheel)"
          @change="onSelectionChange"
        />
        <FormCheckRadioGroup
          v-model="selection.tournament"
          name="selection"
          type="switch"
          :options="{
            tournament: 'Tournament ' + activeLabel(selection.tournament)
          }"
          :label-color="activeColor(selection.tournament)"
            @change="onSelectionChange"
        />

        <FormCheckRadioGroup
          v-model="selection.elitism"
          name="selection"
          type="switch"
          :options="{
            elitism: 'Elitism ' + activeLabel(selection.elitism)
          }"
          :label-color="activeColor(selection.elitism)"
            @change="onSelectionChange"
        />
      </div>

      <div class="grid grid-cols-1 gap-x-4 gap-y-4 xl:grid-cols-1">
        <FormField label="Ukuran Tournament" v-if="selection.tournament">
          <FormControl
            v-model="selection.tournament_size"
            name="tournamentSize"
            :icon="mdiCalendar"
            @change="onSelectionChange"
            type="number"
            min="2"
            step="1"

          />
        </FormField>
      </div>

      <CardBox :has-component-layout="true" :is-nested="true" :nested-level="2" rounded="rounded-md">
                <CardBoxComponentBody>
                    <p class="text-md text-slate-500"><b>Jenis Seleksi</b> merupakan metode yang digunakan untuk memilih individu yang akan
                        dijadikan sebagai orang tua dalam proses reproduksi. 
                        <br>
                        Jika dipilih lebih dari satu metode, maka metode yang dipilih akan dijalankan secara random pada tiap generasi.
                    </p>
                </CardBoxComponentBody>
    </CardBox>

    </CardBoxComponentBody>
  </CardBox>
</template>
