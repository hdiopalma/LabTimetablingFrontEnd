<script setup>
//Icon
import { mdiAccount, mdiInformation } from '@mdi/js'

//Vue
import { reactive, ref, computed, watch } from 'vue'

//Component
import CardBox from '@/components/CardBox.vue'

import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'

import SectionTitle from '@/components/SectionTitle.vue'
import BaseDivider from '@/components/BaseDivider.vue'

import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'
import CardBoxComponentFooter from '@/components/CardBoxComponentFooter.vue'

import NotificationBarInCard from '@/components/NotificationBarInCard.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'

//Configuration Component
import AlgorithmConfig from '@/components/Solution/AlgorithmConfig.vue'
import SelectSemester from '@/components/Semester/SelectOption.vue'

//Store
import { useSolutionConfigurationStore } from '@/stores/solution_configuration'

//Router
import { useRouter } from 'vue-router'

//Sweetalert2
import Swal from 'sweetalert2'

//Variable
const router = useRouter()
const solutionConfigurationStore = useSolutionConfigurationStore()

//Props (optional, for update data)
const props = defineProps({
  data: {
    type: Object,
    default: null
  },
  update: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

//Data
const formData = reactive({
  semesterSolution: ''
})

const submit = async () => {
  try {
    solutionConfigurationStore.setSemester(formData.semesterSolution)
    // console.log(solutionConfigurationStore.configuration)
    const response = await solutionConfigurationStore.applyConfiguration()
    if (response.status === 200) {
      successAlert(response.data.message)
    }
  } catch (error) {
    errorAlert()
  }
}

//Sweetalert2
const successAlert = (id) => {
  Swal.fire({
    title: 'Proses berhasil ditugaskan!',
    text: 'Anda dapat melihat status proses pada table atau data yang bersangkutan',
    icon: 'success',
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonText: 'Lihat Table',
    cancelButtonText: 'Lihat Data',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/solutions')
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      router.push('/semesters/' + id)
    }
  })
}

const errorAlert = () => {
  Swal.fire({
    title: 'Data gagal disimpan',
    icon: 'error',
    confirmButtonText: 'OK'
  })
}

</script>

<template>
  <form @submit.prevent="submit">
    <CardBox :has-component-layout="true">
      <div>
        <CardBoxComponentHeader title="Konfigurasi Dasar" />
        <CardBoxComponentBody :no-padding="false">
          <FormField label="Pilih Semester">
            <SelectSemester v-model="formData.semesterSolution" :disabled="props.disabled" />
          </FormField>
        </CardBoxComponentBody>
      </div>
    </CardBox>

    <BaseDivider />

    <AlgorithmConfig />

    <BaseDivider />

    <BaseButtons type="justify-end">
      <BaseButton type="submit" color="info" :label="update ? 'Update' : 'Submit'" :disabled="props.disabled" />
      <BaseButton type="reset" color="info" outline label="Reset" />
    </BaseButtons>
  </form>
</template>
