<script setup>

import { mdiCalendar } from '@mdi/js';
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import { useSemesterStore } from '@/stores/semester'
import { useSolutionConfigurationStore } from '@/stores/solution_configuration'

import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'

const solutionConfigurationStore = useSolutionConfigurationStore()
const fitness = solutionConfigurationStore.getFitness
const groupAssignmentConflict = ref(fitness.group_assignment_conflict)
const assistantDistribution = ref(fitness.assistant_distribution)

const onGroupAssignmentConflictChange = () => {
    solutionConfigurationStore.setFitness({ group_assignment_conflict: groupAssignmentConflict.value })
}

const onAssistantDistributionChange = () => {
    solutionConfigurationStore.setFitness({ assistant_distribution: assistantDistribution.value })
}

</script>


<template>

    <CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
                <CardBoxComponentBody>
                    <p class="text-md text-slate-500"><b>Fungsi Fitness</b> adalah fungsi yang mengatur bagaimana penilaian solusi yang dihasilkan oleh algoritma. Fungsi ini akan memberikan nilai penalti berdasarkan konfigurasi yang telah diatur.
                        Sederhananya, fungsi ini akan mengatur karakterisk solusi yang akan dihasilkan algoritma. Atur konfigurasi berikut sesuai dengan kebutuhan, semakin kompleks konfigurasi yang diatur, kemungkinan akan membutuhkan waktu dan iterasi yang lebih lama, jadi sesuaikan pula pengaturan algoritma berdasarkan aturan fungsi fitness ini.
                    </p>
                </CardBoxComponentBody>
    </CardBox>

    <br/>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
            <CardBoxComponentHeader title="Target Jumlah Kelompok per Shift" />
            <CardBoxComponentBody>
                <FormField label="Target">
                    <FormControl v-model="groupAssignmentConflict.max_threshold" name="maxThreshold" :icon="mdiCalendar"
                        @change="onGroupAssignmentConflictChange" type="number" />
                </FormField>
                <FormField label="Penalti overflow">
                    <FormControl v-model="groupAssignmentConflict.conflict_penalty" name="conflictPenalty"
                        :icon="mdiCalendar" @change="onGroupAssignmentConflictChange" type="number" step="0.05" />
                </FormField>
                <FormField label="Penalti underflow (on progress)">
                    <FormControl :icon="mdiCalendar" type="number" step="0.05" />
                </FormField>
            </CardBoxComponentBody>
        </CardBox>

        <CardBox :has-component-layout="true" :is-nested="true" :nested-level="1" rounded="rounded-md">
            <CardBoxComponentHeader title="Distribusi Asisten" />
            <CardBoxComponentBody class="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <FormField label="Max Kelompok per Asisten">
                    <FormControl v-model="assistantDistribution.max_group_threshold" name="maxGroupThreshold"
                        :icon="mdiCalendar" @change="onAssistantDistributionChange" type="number" />
                </FormField>
                <FormField label="Penalti Kelompok">
                    <FormControl v-model="assistantDistribution.group_penalty" name="groupPenalty" :icon="mdiCalendar"
                        @change="onAssistantDistributionChange" type="number" step="0.05" />
                </FormField>
                <FormField label="Max Shift per Asisten">
                    <FormControl v-model="assistantDistribution.max_shift_threshold" name="maxShiftThreshold"
                        :icon="mdiCalendar" @change="onAssistantDistributionChange" type="number" />
                </FormField>
                <FormField label="Penalti Shift">
                    <FormControl v-model="assistantDistribution.shift_penalty" name="shiftPenalty" :icon="mdiCalendar"
                        @change="onAssistantDistributionChange" type="number" step="0.05" />
                </FormField>
            </CardBoxComponentBody>
        </CardBox>
    </div>


</template>