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
import LocalSearchConfig from '@/components/Solution/LocalSearch/LocalSearchConfig.vue'
import AlgorithmConfig from '@/components/Solution/AlgorithmConfig.vue'
import SelectSemester from '@/components/Semester/SelectOption.vue'

//Store
import { useSemesterStore } from '@/stores/semester'

//Router
import { useRouter } from 'vue-router'

//Sweetalert2
import Swal from 'sweetalert2'

//Variable
const router = useRouter()
const semesterStore = useSemesterStore()

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

//Define emits for updated message
const emit = defineEmits(['data-updated'])
const dataUpdated = () => {
  emit('data-updated')
}

//Data
const formData = reactive({
  semesterSolution: ''
})

//Method
const formReset = () => {
  formData.namaSemester = props.data ? props.data.name : ''
  formData.statusSemester = props.data ? props.data.status : false
}

//Submit
//Database operation
const formSubmit = async () => {
  const data = {
    name: formData.semesterSolution
  }
  try {
    const response = await semesterStore.addItem(data)
    if (response.status === 201) {
      formReset()
      successAlert(response.data.id)
    } else {
      errorAlert()
    }
  } catch (error) {
    console.log(error)
    errorAlert()
  }
}

//Update
//Database operation
const formUpdate = async () => {
  const data = {
    id: props.data.id,
    name: formData.namaSemester,
    status: formData.statusSemester
  }
  try {
    const response = await semesterStore.updateItem(data)
    if (response.status === 200) {
      successAlert(props.data.id)
      dataUpdated()
    } else {
      errorAlert()
    }
  } catch (error) {
    console.log(error)
    errorAlert()
  }
}

const submit = () => {
  if (props.update) {
    formUpdate()
  } else {
    formSubmit()
  }
}

//Sweetalert2
const successAlert = (id) => {
  Swal.fire({
    title: 'Data berhasil disimpan',
    icon: 'success',
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonText: 'Lihat Table',
    cancelButtonText: 'Lihat Data',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/semesters')
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

  <CardBox :has-component-layout="true">
    <div>
      <CardBoxComponentHeader title="Konfigurasi Algoritma" :buttonIcon="mdiInformation" />

      <CardBoxComponentBody :no-padding="false">

        <AlgorithmConfig />

      </CardBoxComponentBody>
    </div>
  </CardBox>

  <BaseDivider />

  <CardBox :has-component-layout="true">
    <div>
      <CardBoxComponentHeader title="Konfigurasi Local Search" />

      <CardBoxComponentBody :no-padding="false">
        
          <LocalSearchConfig />
       
      </CardBoxComponentBody>
    </div>
  </CardBox>

  <BaseDivider />

  <BaseButtons type="justify-end">
    <BaseButton type="submit" color="info" :label="update ? 'Update' : 'Submit'" :disabled="props.disabled" />
    <BaseButton type="reset" color="info" outline label="Reset" />
  </BaseButtons>
</template>
