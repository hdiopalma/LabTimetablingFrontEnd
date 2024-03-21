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

import FormInputAssistant from '@/components/Assistant/FormInput.vue'

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
    await labStore.fetchItems()
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
        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Forms Assistant" main>
                <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast"
                    rounded-full small />
            </SectionTitleLineWithButton>

            <FormInputAssistant />
            
        </SectionMain>
</template>
