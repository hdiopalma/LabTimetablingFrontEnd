<script setup>
//operator
import OperatorSelection from '@/components/Solution/Operator/Selection.vue'
import OperatorCrossover from '@/components/Solution/Operator/Crossover.vue'
import OperatorMutation from '@/components/Solution/Operator/Mutation.vue'
import OperatorRepair from '@/components/Solution/Operator/Repair.vue'

//component
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'
</script>

<template>

<CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
                <CardBoxComponentBody>
                    <p class="text-md text-slate-500"><b>Operator</b> mengatur bagaimana algoritma akan melakukan operasi pada solusi yang dikerjakan.
                    </p>
                </CardBoxComponentBody>
    </CardBox>

    <br/>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <OperatorSelection />
        <OperatorCrossover />
        <OperatorMutation />
        <OperatorRepair />
    </div>
</template>