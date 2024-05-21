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
const tabu_search = ref(solutionConfigurationStore.getTabuSearch)
//operator config

const onTabuSearchChange = () => {
  solutionConfigurationStore.setTabuSearch(tabu_search.value)
}


</script>

<template>
  <CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
    <CardBoxComponentHeader title="Konfigurasi Tabu Search" />
    <CardBoxComponentBody>
      <div class="grid grid-cols-1 gap-x-4 gap-y-1 xl:grid-cols-2">
        <FormField label="Ukuran Tabu List" class="mb-0">
          <FormControl v-model="tabu_search.tabu_list_size" name="tabuListSize" :icon="mdiCalendar" @change="onTabuSearchChange" type="number" />
        </FormField>
        <FormField label="Maksimum Iterasi" class="mb-0">
          <FormControl v-model="tabu_search.max_iteration" name="maxIteration" :icon="mdiCalendar" @change="onTabuSearchChange" type="number" />
        </FormField>
        <FormField label="Maksimum Waktu (detik)" class="mb-0">
          <FormControl v-model="tabu_search.max_time" name="maxTime" :icon="mdiCalendar" @change="onTabuSearchChange" type="number" />
        </FormField>
        <FormField label="Maksimum Iterasi Tanpa Perkembangan" class="mb-0">
          <FormControl v-model="tabu_search.max_iteration_without_improvement" name="maxIterationWithoutImprovement" @change="onTabuSearchChange" type="number"
            :icon="mdiCalendar" />
        </FormField>
        <FormField label="Maksimum Waktu Tanpa Perkembangan (detik)" class="mb-0">
          <FormControl v-model="tabu_search.max_time_without_improvement" name="maxTimeWithoutImprovement" @change="onTabuSearchChange" type="number"
            :icon="mdiCalendar" />
        </FormField>
      </div>
    </CardBoxComponentBody>
  </CardBox>
</template>
