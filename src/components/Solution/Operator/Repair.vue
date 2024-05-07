<script setup>
import { mdiCalendar } from '@mdi/js'
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import { useSolutionConfigurationStore } from '@/stores/solution_configuration'

import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'

//Store
const solutionConfigurationStore = useSolutionConfigurationStore()

const repair = ref(solutionConfigurationStore.getRepair)

const onRepairChange = () => {
  solutionConfigurationStore.setRepair(repair.value)
  console.log(solutionConfigurationStore.getRepair)
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
    <CardBoxComponentHeader title="Konfigurasi Repair" />
    <CardBoxComponentBody>
      <div>
        <FormCheckRadioGroup
          v-model="repair.time_slot"
          name="repair"
          type="switch"
          :options="{
            time_slot: 'Time Slot ' + activeLabel(repair.time_slot)
          }"
          :label-color="activeColor(repair.time_slot)"
          @change="onRepairChange"
        />
      </div>
    </CardBoxComponentBody>
  </CardBox>
</template>
