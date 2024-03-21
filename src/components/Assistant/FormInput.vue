<script setup>
//Icon
import { mdiAccount, mdiAccountBox } from '@mdi/js'

//Vue
import { reactive, ref, computed, defineProps, watch, toRef, defineEmits } from 'vue'

//Component
import CardBox from '@/components/CardBox.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '../BaseDivider.vue'

import SelectOption from '@/components/CommonForm/SelectOption.vue'

//Store
import { useLabStore } from '@/stores/lab'
import { useSemesterStore } from '@/stores/semester'
import { useAssistantStore } from '@/stores/assistant'

//Router
import { useRouter } from 'vue-router'

//Sweetalert2
import Swal from 'sweetalert2'

//Variable
const router = useRouter()
const labStore = useLabStore()
const semesterStore = useSemesterStore()
const assistantStore = useAssistantStore()

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
    disabled: {
        type: Boolean,
        default: false,
    },
})

//Define emits for updated message
const emit = defineEmits(['data-updated'])
const dataUpdated = () => {
    emit('data-updated')
}

//Data
const formData = reactive({
    namaAsisten: '',
    nimAsisten: '',
    labAsisten: '',
    semesterAsisten: '',
})

const tempData = computed(() => {
    return {
        id: props.data ? props.data.id : null,
        namaAsisten: props.data ? props.data.name : '',
        nimAsisten: props.data ? props.data.nim : '',
        labAsisten: props.data ? props.data.lab.id : '',
        semesterAsisten: props.data ? props.data.semester.id : '',
    }
})

//Updata form data when props.data is changed
watch(tempData, (value) => {
    formData.namaAsisten = value.namaLab
    formData.nimAsisten = value.semesterLab
    formData.labAsisten = value.labAsisten
    formData.semesterAsisten = value.semesterAsisten
})

//Method
const formReset = () => {
    formData.namaAsisten = props.data ? props.data.name : ''
    formData.nimAsisten = props.data ? props.data.nim : ''
    formData.labAsisten = props.data ? props.data.lab.id : ''
    formData.semesterAsisten = props.data ? props.data.semester.id : ''
}


//Submit
//Database operation
const formSubmit = async () => {
    const data = {
        name: formData.namaAsisten,
        nim: formData.nimAsisten,
        laboratory: formData.labAsisten,
        semester: formData.semesterAsisten,
    }
    try {
        const response = await assistantStore.addItem(data)
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
        name: formData.namaAsisten,
        nim: formData.nimAsisten,
        laboratory: formData.labAsisten,
        semester: formData.semesterAsisten,
    }
    try {
        const response = await assistantStore.updateItem(data)
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
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            router.push('/labs')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            router.push('/labs/' + id)
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
                <SelectOption name="labAsisten" :store="labStore" v-model="formData.labAsisten" />
            </FormField>

            <FormField label="Semester Aktif" labelFor="semesterAsisten"
                help="Pilih semester dimana mahasiswa ini aktif sebagai asisten">
                <SelectOption name="semesterAsisten" :store="semesterStore" v-model="formData.semesterAsisten" />
            </FormField>
        </div>

        <template #footer>
            <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
            </BaseButtons>
        </template>
    </CardBox>
</template>