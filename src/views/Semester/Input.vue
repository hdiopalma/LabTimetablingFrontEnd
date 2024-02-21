<script setup>
import { reactive, ref, computed } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiRefresh, mdiGithub } from '@mdi/js'
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

import { useRouter } from 'vue-router'

const router = useRouter()

const goToBack = () => {
  router.push('/semesters')
}


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
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Forms Semester" main>
        <BaseButton
          @click="goToBack"
          target="_blank"
          :icon="mdiRefresh"
          label="Go back"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox form @submit.prevent="submit">
        <FormField label="Nama Semester">
          <FormControl :icon="mdiAccount" placeholder="Nama Semester" />
        </FormField>

        <BaseDivider />

        <FormField label="Status Semester" help="Ketika diaktifkan, semester akan aktif. Lalu semester yang lain akan dinonaktifkan.">
          <FormCheckRadioGroup
            v-model="customElementsFormRef.switch"
            name="statusSemester"
            type="switch"
            :options="{statusSemester: switchLabel}"
            @change="toggleSwitch"
            :label-color="switchLabelColor"
          />
        </FormField>

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
