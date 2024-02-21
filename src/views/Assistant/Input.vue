<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiRefresh, mdiAccountBox } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import NotificationBarInCard from '@/components/NotificationBarInCard.vue'

import LabSelectOption from '@/components/Lab/SelectOption.vue'
import SemesterSelectOption from '@/components/Semester/SelectOption.vue'

//Lab Store
import { useLabStore } from '@/stores/lab'

import { useRouter } from 'vue-router'

const labStore = useLabStore()
const router = useRouter()

const goToBack = () => {
    // router.push('/assistants')
    router.go(-1)
}

const labsItems = ref([])
onMounted(async () => {
    await labStore.fetchLabs()
    labsItems.value = labStore.items.map(item => ({ id: item.id, label: item.name }))
})

const form = reactive({
    labs: labsItems.value,
})


const customElementsForm = reactive({
    checkbox: ['lorem'],
    radio: 'one',
    switch: ['one'],
    file: null,
    switch: false,
})

const customElementsFormRef = ref({
    switchStatus: false,
})

// Change the switch label based on the switch status
const switchLabel = computed(() => {
    return customElementsFormRef.value.switchStatus ? 'Aktif' : 'Tidak Aktif'
})

const switchLabelColor = computed(() => {
    return customElementsFormRef.value.switchStatus ? 'text-green-500 font-medium' : 'text-red-500'
})

const toggleSwitch = () => {
    customElementsFormRef.value.switchStatus = !customElementsFormRef.value.switchStatus
}

const submit = () => {
    //
}

const formStatusWithHeader = ref(true)

const formStatusCurrent = ref(0)

const formStatusOptions = ['info', 'success', 'danger', 'warning']

const formStatusSubmit = () => {
    formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
        ? formStatusCurrent.value + 1
        : 0
}


</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Forms Assistant" main>
                <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast"
                    rounded-full small />
            </SectionTitleLineWithButton>
            <CardBox form @submit.prevent="submit">

                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField label="Nama Asisten">
                        <FormControl :icon="mdiAccount" placeholder="Nama Asisten" name="namaAsisten" />
                    </FormField>

                    <FormField label="NIM Asisten">
                        <FormControl :icon="mdiAccountBox" placeholder="NIM Asisten" name="nimAsisten" type="number" />
                    </FormField>
                </div>

                <BaseDivider />

                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField label="Laboratorium" labelFor="labAsisten" help="Pilih lab untuk asisten ini">
                        <LabSelectOption name="labAsisten" />
                    </FormField>

                    <FormField label="Semester Aktif" labelFor="semesterAsisten" help="Pilih semester dimana mahasiswa ini aktif sebagai asisten">
                        <SemesterSelectOption name="semesterAsisten" />
                    </FormField>
                </div>

                <template #footer>
                    <BaseButtons>
                        <BaseButton type="submit" color="info" label="Submit" />
                        <BaseButton type="reset" color="info" outline label="Reset" />
                    </BaseButtons>
                </template>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
