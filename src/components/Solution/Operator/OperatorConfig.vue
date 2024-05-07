<script setup>
//operator
import OperatorSelection from '@/components/Solution/Operator/Selection.vue'
import OperatorCrossover from '@/components/Solution/Operator/Crossover.vue'
import OperatorMutation from '@/components/Solution/Operator/Mutation.vue'
import OperatorRepair from '@/components/Solution/Operator/Repair.vue'
</script>

<template>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <OperatorSelection />
        <OperatorCrossover />
        <OperatorMutation />
        <OperatorRepair />
    </div>
</template>