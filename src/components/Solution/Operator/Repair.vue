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

const repair = ref({
    time_slot: true,
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
        <CardBoxComponentHeader title="Konfigurasi Repair" />
        <CardBoxComponentBody>
            <div>
                <FormCheckRadioGroup v-model="repair.time_slot" name="repair" type="switch" :options="{
        'time_slot': 'Time Slot ' + activeLabel(repair.time_slot),
    }" :label-color="activeColor(repair.time_slot)" />
            </div>
        </CardBoxComponentBody>
    </CardBox>

</template>