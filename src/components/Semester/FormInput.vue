
<script setup>
//Icon
import { mdiAccount } from '@mdi/js'

//Vue
import { reactive, ref, computed, defineProps } from 'vue'

//Component
import CardBox from '@/components/CardBox.vue'

import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'

import BaseDivider from '@/components/BaseDivider.vue'

import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'

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
    default: null,
  },
  update: {
    type: Boolean,
    default: false,
  },
})

//Data
const formData = reactive({
  namaSemester: props.data ? props.data.name : '',
  statusSemester: props.data ? props.data.status : false,
})

const customElementsFormRef = ref({
  switchStatus: false,
})

//Method
const formReset = () => {
  formData.namaSemester = props.data ? props.data.name : ''
  formData.statusSemester = props.data ? props.data.status : false
}

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

//Submit
//Database operation
const formSubmit = async () => {
  const data = {
    name: formData.namaSemester,
    status: formData.statusSemester,
  }
  try {
    const response = await semesterStore.addSemester(data)
    if (response.status === 201) {
      formReset()
      successAlert()
    } else {
      errorAlert()
    }
  } catch (error) {
    console.log(error)
    errorAlert()
  }
}

const submit = () => {
  formSubmit()
}

//Sweetalert2
const successAlert = () => {
  Swal.fire({
    title: 'Data berhasil disimpan',
    icon: 'success',
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonText: 'Lihat Table',
    cancelButtonText: 'Lihat Data',
    cancelButtonColor: '#d33',
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/semesters')
    }
  })
}

const errorAlert = () => {
  Swal.fire({
    title: 'Data gagal disimpan',
    icon: 'error',
    confirmButtonText: 'OK',
  })
}

</script>

<template>
    <CardBox is-form @submit.prevent="submit">
        <FormField label="Nama Semester">
          <FormControl :icon="mdiAccount" placeholder="Nama Semester" name="namaSemester" v-model="formData.namaSemester" />
        </FormField>

        <BaseDivider />

        <FormField label="Status Semester" help="Ketika diaktifkan semester yang lain otomatis akan dinonaktifkan">
          <FormCheckRadioGroup
            v-model="formData.statusSemester"
            name="statusSemester"
            type="switch"
            :options="{statusSemester: switchLabel}"
            @change="toggleSwitch"
            :label-color="switchLabelColor"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" :label="update ? 'Update' : 'Submit'" />
            <BaseButton type="reset" color="info" outline label="Reset" @click="formReset" />
          </BaseButtons>
        </template>
      </CardBox>
</template>