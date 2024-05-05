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

//operator
import OperatorSelection from '@/components/Solution/Operator/Selection.vue'
import OperatorCrossover from '@/components/Solution/Operator/Crossover.vue'
import OperatorMutation from '@/components/Solution/Operator/Mutation.vue'
import OperatorRepair from '@/components/Solution/Operator/Repair.vue'

//operator config
const selection = reactive({
    roulette_wheel: true,
    tournament: false,
    tournament_size: 2,
    elitism: true,
})

const crossover = ref({
    crossover_probability: 0.1,
    single_point: true,
    two_point: false,
    uniform: false,
    uniform_probability: 0.5
})

const mutation = ref({
    mutation_probability: 0.1,
    swap: true,
    shift: false,
    random: false,
})

const repair = ref({
    time_slot: true,
})

const operator = ref({
    selection: selection,
    crossover: crossover,
    mutation: mutation,
    repair: repair
})


function activeLabel(bool) {
    return bool ? '' : ''
}

function activeColor(bool) {
    return bool ? 'text-slate-900 font-medium' : 'text-slate-500'
}

</script>


<template>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">

        <OperatorSelection />

        <OperatorCrossover />

        <OperatorMutation />

        <OperatorRepair />
    </div>


</template>