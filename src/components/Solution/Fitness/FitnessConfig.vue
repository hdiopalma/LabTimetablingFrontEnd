<script setup>

import { mdiCalendar } from '@mdi/js';
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import { useSemesterStore } from '@/stores/semester'

import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'


const groupAssignmentConflict = ref({
    max_threshold: 3,
    conflict_penalty: 1
})

const assistantDistribution = ref({
    max_group_threshold: 15,
    max_shift_threshold: 50,
    group_penalty: 1,
    shift_penalty: 1
})

const fitness = ref({
    "group_assignment_conflict": groupAssignmentConflict,
    "assistant_distribution": assistantDistribution
})


</script>


<template>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
        <CardBoxComponentHeader title="Konflik Penugasan Kelompok" />
        <CardBoxComponentBody>
            <FormField label="Maksimal Threshold" class="pb-4">
                <FormControl v-model="groupAssignmentConflict.max_threshold" name="maxThreshold" :icon="mdiCalendar" />
            </FormField>
            <FormField label="Penalti Konflik">
                <FormControl v-model="groupAssignmentConflict.conflict_penalty" name="conflictPenalty" :icon="mdiCalendar" />
            </FormField>
        </CardBoxComponentBody>
    </CardBox>

    <CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
        <CardBoxComponentHeader title="Distribusi Asisten" />
        <CardBoxComponentBody class="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <FormField label="Max Kelompok per Asisten">
                <FormControl v-model="assistantDistribution.max_group_threshold" name="maxGroupThreshold" :icon="mdiCalendar" />
            </FormField>
            <FormField label="Penalti Kelompok">
                <FormControl v-model="assistantDistribution.group_penalty" name="groupPenalty" :icon="mdiCalendar" />
            </FormField>
            <FormField label="Max Shift per Asisten">
                <FormControl v-model="assistantDistribution.max_shift_threshold" name="maxShiftThreshold" :icon="mdiCalendar" />
            </FormField>
            <FormField label="Penalti Shift">
                <FormControl v-model="assistantDistribution.shift_penalty" name="shiftPenalty" :icon="mdiCalendar" />
            </FormField>
        </CardBoxComponentBody>
    </CardBox>
</div>


</template>