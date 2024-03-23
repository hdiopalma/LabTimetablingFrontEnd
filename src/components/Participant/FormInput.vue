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

import SelectOption from '@/components/CommonForm/SelectOption.vue'

//Store
import { useSemesterStore } from '@/stores/semester'
import { useParticipantStore } from '@/stores/participant'

//Router
import { useRouter } from 'vue-router'

//Sweetalert2
import Swal from 'sweetalert2'

//Variable
const router = useRouter()
const semesterStore = useSemesterStore()
const participantStore = useParticipantStore()

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
    namaPartisipan: '',
    nimPartisipan: '',
    semesterAsisten: '',
})

const tempData = computed(() => {
    return {
        id: props.data ? props.data.id : null,
        namaAsisten: props.data ? props.data.name : '',
        nimAsisten: props.data ? props.data.nim : '',
        semesterAsisten: props.data ? props.data.semester : '',
    }
})

//Updata form data when props.data is changed
watch(tempData, (value) => {
    formData.namaPartisipan = value.namaAsisten
    formData.nimPartisipan = value.nimAsisten
    formData.semesterAsisten = value.semesterAsisten

})

//Method
const formReset = () => {
    formData.namaPartisipan = props.data ? props.data.name : ''
    formData.nimPartisipan = props.data ? props.data.nim : ''
    formData.semesterAsisten = props.data ? props.data.semester : ''
}


//Submit
//Database operation
const formSubmit = async () => {
    const data = {
        name: formData.namaPartisipan,
        nim: formData.nimPartisipan,
        semester: formData.semesterAsisten,
    }
    try {
        const response = await participantStore.addItem(data)
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
        name: formData.namaPartisipan,
        nim: formData.nimPartisipan,
        semester: formData.semesterAsisten,
    }
    try {
        const response = await participantStore.updateItem(data)
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
            router.push('/participants')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            router.push('/participants/' + id)
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
    <CardBox @submit.prevent="submit" @reset.prevent="formReset" isForm>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField label="Nama Partisipan" help="Nama lengkap Mahasiswa">
                <FormControl :icon="mdiAccount" placeholder="E.g: Hernando Dicaprio" name="namaPartisipan"
                    v-model="formData.namaPartisipan" />
            </FormField>

            <FormField label="NIM Partisipan" help="Nomor Induk Mahasiswa">
                <FormControl :icon="mdiAccountBox" placeholder="E.g: 3332190049" name="nimPartisipan" type="number"
                    v-model="formData.nimPartisipan" />
            </FormField>

            <FormField label="Semester Aktif" labelFor="semesterPartisipan"
                help="Pilih semester dimana mahasiswa ini aktif sebagai partisipan">
                <SelectOption name="semesterPartisipan" :store="semesterStore" v-model="formData.semesterAsisten" />
            </FormField>

        </div>

        <template #footer>
            <BaseButtons>
                <BaseButton type="submit" color="info" :disabled="props.disabled" :label="props.update ? 'Update' : 'Submit'" />
                <BaseButton type="reset" color="info" outline label="Reset" />
            </BaseButtons>
        </template>
    </CardBox>
</template>