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
const selection = reactive({
  roulette_wheel: true,
  tournament: false,
  tournament_size: 2,
  elitism: true
})

const algorithm = ref('random_swap')

const neighborhood_algorithm = [
  {
    id: 'random_swap',
    label: 'Random Swap'
  },
  {
    id: 'random_range_swap',
    label: 'Random Range Swap'
  },
  {
    id: 'distance_swap',
    label: 'Distance Swap'
  },
  {
    id: 'swap',
    label: 'Swap'
  }
]

const random_swap = ref({
  neighborhood_size: 100
})

const random_range_swap = ref({
  neighborhood_size_factor: 0.1,
  range_size_factor: 0.1
})

const distance_swap = ref({
  neighborhood_size: 100
})

//swap is true when algorithm is swap
const swap = computed(() => algorithm.value === 'swap')

function activeLabel(bool) {
  return bool ? '' : ''
}

function activeColor(bool) {
  return bool ? 'text-slate-900 font-medium' : 'text-slate-500'
}
</script>

<template>
  <CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
    <CardBoxComponentHeader title="Konfigurasi Neighborhood" />
    <CardBoxComponentBody>
      <div class="grid grid-cols-1 gap-x-4 mb-4">
        <FormField label="Algoritma Neighborhood">
          <FormControl
            v-model="algorithm"
            :options="neighborhood_algorithm"
            name="neighborhoodAlgorithm"
            :icon="mdiCalendar"
          />
        </FormField>
      </div>

        <CardBox :has-component-layout="true" :is-nested="true" :nested-level="2" rounded="rounded-md" v-if="algorithm === 'random_swap'">
            <CardBoxComponentHeader title="Random Swap" />
            <CardBoxComponentBody>
            <FormField label="Ukuran Neighborhood">
                <FormControl v-model="random_swap.neighborhood_size" name="neighborhoodSize" :icon="mdiCalendar" />
            </FormField>
            </CardBoxComponentBody>
        </CardBox>

        <CardBox :has-component-layout="true" :is-nested="true" :nested-level="2" rounded="rounded-md" v-if="algorithm === 'random_range_swap'">
            <CardBoxComponentHeader title="Random Range Swap" />
            <CardBoxComponentBody>
            <FormField label="Faktor Ukuran Neighborhood">
                <FormControl v-model="random_range_swap.neighborhood_size_factor" name="neighborhoodSizeFactor" :icon="mdiCalendar" />
            </FormField>
            <FormField label="Faktor Ukuran Range">
                <FormControl v-model="random_range_swap.range_size_factor" name="rangeSizeFactor" :icon="mdiCalendar" />
            </FormField>
            </CardBoxComponentBody>
        </CardBox>

        <CardBox :has-component-layout="true" :is-nested="true" :nested-level="2" rounded="rounded-md" v-if="algorithm === 'distance_swap'">
            <CardBoxComponentHeader title="Distance Swap" />
            <CardBoxComponentBody>
            <FormField label="Ukuran Neighborhood">
                <FormControl v-model="distance_swap.neighborhood_size" name="neighborhoodSize" :icon="mdiCalendar" />
            </FormField>
            </CardBoxComponentBody>
        </CardBox>

    </CardBoxComponentBody>
  </CardBox>
</template>
