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
    //router.push('/participants')
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
    namaPartisipan: '',
    nimPartisipan: '',
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

const formReset = () => {
    customElementsForm.namaPartisipan = ''
    customElementsForm.nimPartisipan = ''
}


</script>

<template>
    <LayoutAuthenticated>
        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Forms Participant" main>
                <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast"
                    rounded-full small />
            </SectionTitleLineWithButton>
            <CardBox form @submit.prevent="submit">

                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField label="Nama Partisipan" help="Nama lengkap Mahasiswa">
                        <FormControl :icon="mdiAccount" placeholder="E.g: Hernando Dicaprio" name="namaPartisipan" v-model="customElementsForm.namaPartisipan" />
                    </FormField>

                    <FormField label="NIM Partisipan" help="Nomor Induk Mahasiswa">
                        <FormControl :icon="mdiAccountBox" placeholder="E.g: 3332190049" name="nimPartisipan" type="number" v-model="customElementsForm.nimPartisipan" />
                    </FormField>

                    <FormField label="Semester Aktif" labelFor="semesterPartisipan" help="Pilih semester dimana mahasiswa ini aktif sebagai partisipan">
                        <SemesterSelectOption name="semesterPartisipan" />
                    </FormField>

                </div>

                <template #footer>
                    <BaseButtons>
                        <BaseButton type="submit" color="info" label="Submit" />
                        <BaseButton type="reset" color="info" outline label="Reset" @click="formReset" />
                    </BaseButtons>
                </template>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
