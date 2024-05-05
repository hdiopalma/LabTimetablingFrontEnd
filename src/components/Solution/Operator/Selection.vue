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

//operator config
const selection = reactive({
    roulette_wheel: true,
    tournament: false,
    tournament_size: 2,
    elitism: true,
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
        <CardBoxComponentHeader title="Konfigurasi Seleksi" />
        <CardBoxComponentBody>
            <div class="grid grid-cols-1 gap-x-4 gap-y-4 xl:grid-cols-2 mb-4">
                <FormCheckRadioGroup v-model="selection.roulette_wheel" name="selection" type="switch" :options="{
        'roulette_wheel': 'Roulette Wheel ' + activeLabel(selection.roulette_wheel),
    }" :label-color="activeColor(selection.roulette_wheel)" />
                <FormCheckRadioGroup v-model="selection.tournament" name="selection" type="switch" :options="{
        'tournament': 'Tournament ' + activeLabel(selection.tournament),
    }" :label-color="activeColor(selection.tournament)" />

                <FormCheckRadioGroup v-model="selection.elitism" name="selection" type="switch" :options="{
        'elitism': 'Elitism ' + activeLabel(selection.elitism),
    }" :label-color="activeColor(selection.elitism)" />
            </div>

            <div class="grid grid-cols-1 gap-x-4 gap-y-4 xl:grid-cols-1">
                <FormField label="Ukuran Tournament" v-if="selection.tournament">
                    <FormControl v-model="selection.tournament_size" name="tournamentSize" :icon="mdiCalendar" />
                </FormField>
            </div>
        </CardBoxComponentBody>
    </CardBox>
</template>