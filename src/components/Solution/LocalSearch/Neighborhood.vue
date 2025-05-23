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

const solutionConfigurationStore = useSolutionConfigurationStore()

const neighborhood = solutionConfigurationStore.getNeighborhood
const algorithm = ref(neighborhood.algorithm)
const random_swap = ref(neighborhood.random_swap)
const random_range_swap = ref(neighborhood.random_range_swap)
const distance_swap = ref(neighborhood.distance_swap)
//swap is true when algorithm is swap
// const swap = computed(() => algorithm.value === 'swap')

const neighborhood_option = [
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

const onAlgorithmChange = () => {
  solutionConfigurationStore.$state.configuration.local_search.config.neighborhood.swap = algorithm.value === 'swap'
}

const onNeighborhoodChange = () => {
  solutionConfigurationStore.setNeighborhood({
    algorithm: algorithm.value,
    random_swap: random_swap.value,
    random_range_swap: random_range_swap.value,
    distance_swap: distance_swap.value,
  })
}

</script>

<template>
  <CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
    <CardBoxComponentHeader title="Konfigurasi Neighborhood" />
    <CardBoxComponentBody>
      <div class="grid grid-cols-1 gap-x-4 mb-4">
        <FormField label="Algoritma Neighborhood">
          <FormControl v-model="algorithm" :options="neighborhood_option" name="neighborhoodAlgorithm" @change="onAlgorithmChange"
            :icon="mdiCalendar" />
        </FormField>
      </div>

      <!-- Random Swap -->

      <CardBox :has-component-layout="true" :is-nested="true" :nested-level="2" rounded="rounded-md"
        v-if="algorithm === 'random_swap'">
        <CardBoxComponentHeader title="Random Swap" />
        <CardBoxComponentBody>
          <CardBox :has-component-layout="true" :is-nested="true" :nested-level="3" rounded="rounded-md">
            <CardBoxComponentBody>
              <p class="text-md text-slate-500">Random Swap akan mempertukarkan gen secara acak. Algoritma yang digunakan sama dengan algoritma swap, hanya saja gen yang dipertukarkan dipilih secara acak. Paling konsisten dari segi kecepatan dan hasil.</p>
            </CardBoxComponentBody>
          </CardBox>
          <br>
          <FormField label="Ukuran Neighborhood">
            <FormControl v-model="random_swap.neighborhood_size" name="neighborhoodSize" :icon="mdiCalendar" type="number" @change="onNeighborhoodChange" />
          </FormField>
        </CardBoxComponentBody>
      </CardBox>

      <!-- Random Range Swap -->

      <CardBox :has-component-layout="true" :is-nested="true" :nested-level="2" rounded="rounded-md"
        v-if="algorithm === 'random_range_swap'">
        <CardBoxComponentHeader title="Random Range Swap" />
        <CardBoxComponentBody>
          <CardBox :has-component-layout="true" :is-nested="true" :nested-level="3" rounded="rounded-md">
            <CardBoxComponentBody>
              <p class="text-md text-slate-500">Random Range Swap akan mempertukarkan gen pada persentase jarak
                tertentu. Jarak dihitung dari posisi gen pada solusi. <b>Faktor ukuran neighborhood</b> menentukan besar ukuran
                neighborhood yang dihasilkan berdasarkan persentase ukuran solusi. <b>Faktor ukuran range</b> menentukan jarak
                gen yang akan dipertukarkan.</p>
            </CardBoxComponentBody>
          </CardBox>
          <br>
          <FormField label="Faktor Ukuran Neighborhood">
            <FormControl v-model="random_range_swap.neighborhood_size_factor" name="neighborhoodSizeFactor" @change="onNeighborhoodChange" type="number" max="1" min="0.01" step="0.001"
              :icon="mdiCalendar" />
          </FormField>
          <FormField label="Faktor Ukuran Range">
            <FormControl v-model="random_range_swap.range_size_factor" name="rangeSizeFactor" @change="onNeighborhoodChange" type="number" max="1" min="0.01" step="0.001"
            :icon="mdiCalendar" />
          </FormField>
        </CardBoxComponentBody>
      </CardBox>

      <!-- Distance Swap -->

      <CardBox :has-component-layout="true" :is-nested="true" :nested-level="2" rounded="rounded-md"
        v-if="algorithm === 'distance_swap'">
        <CardBoxComponentHeader title="Distance Swap" />
        <CardBoxComponentBody>
          <CardBox :has-component-layout="true" :is-nested="true" :nested-level="3" rounded="rounded-md">
            <CardBoxComponentBody>
              <p class="text-md text-slate-500">Distance Swap akan mempertukarkan gen pada persentase jarak euclidean
                tertentu. Jarak dihitung dari posisi gen pada solusi.</p>
            </CardBoxComponentBody>
          </CardBox>
          <br>
          <FormField label="Persentase Jarak">
            <FormControl v-model="distance_swap.distance_percentage" name="distancePercentage" @change="onNeighborhoodChange" type="number"
            :icon="mdiCalendar" />
          </FormField>
        </CardBoxComponentBody>
      </CardBox>

      <!-- Swap -->

      <CardBox :has-component-layout="true" :is-nested="true" :nested-level="2" rounded="rounded-md" v-if="algorithm === 'swap'">
        <CardBoxComponentHeader title="Swap" />
        <CardBoxComponentBody>
          <p class="text-md text-slate-500">Swap tidak memiliki konfigurasi, tiap gen akan dipertukarkan dengan gen
            lainnya. Besar ukuran neighborhood yang dihasilkan eksponensial dari ukuran solusi. Sangat lambat dan tidak
            disarankan untuk digunakan.</p>
        </CardBoxComponentBody>
      </CardBox>

    </CardBoxComponentBody>
  </CardBox>
</template>
