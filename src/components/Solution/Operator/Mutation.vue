<script setup>

import { mdiCalendar } from '@mdi/js';
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import { useSemesterStore } from '@/stores/semester'

import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue';
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'

const mutation = ref({
    mutation_probability: 0.1,
    swap: true,
    shift: false,
    random: false,
})



function activeLabel(bool) {
    return bool ? '' : ''
}

function activeColor(bool) {
    return bool ? 'text-slate-900 font-medium' : 'text-slate-500'
}

</script>


<template>

        <CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
            <CardBoxComponentHeader title="Konfigurasi Mutasi" />
            <CardBoxComponentBody>
                <div class="grid grid-cols-1 gap-x-4 gap-y-4 xl:grid-cols-3 mb-4">
                    <FormCheckRadioGroup v-model="mutation.swap" name="mutation" type="switch"
                        :options="{ 
                            'swap': 'Swap ' + activeLabel(mutation.swap),
                            }"
                        :label-color="activeColor(mutation.swap)" />
                    <FormCheckRadioGroup v-model="mutation.shift" name="mutation" type="switch"
                        :options="{ 
                            'shift': 'Shift ' + activeLabel(mutation.shift),
                            }"
                        :label-color="activeColor(mutation.shift)" />
                    <FormCheckRadioGroup v-model="mutation.random" name="mutation" type="switch"
                        :options="{ 
                            'random': 'Random ' + activeLabel(mutation.random),
                            }"
                        :label-color="activeColor(mutation.random)" />
                </div>
                <div class="grid grid-cols-1 gap-x-4 gap-y-4 xl:grid-cols-1">
                    <FormField label="Probabilitas Mutasi" class="mb-0">
                        <FormControl v-model="mutation.mutation_probability" name="mutationProbability"
                            :icon="mdiCalendar" />
                    </FormField>
                </div>
            </CardBoxComponentBody>
        </CardBox>


</template>