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
import ShiftSelector from '@/components/CommonForm/ShiftSelector.vue'

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

const shiftData = reactive({
    Monday: {Shift1: false, Shift2: false, Shift3: false, Shift4: false, Shift5: false, Shift6: false},
    Tuesday: {Shift1: false, Shift2: false, Shift3: false, Shift4: false, Shift5: false, Shift6: false},
    Wednesday: {Shift1: false, Shift2: false, Shift3: false, Shift4: false, Shift5: false, Shift6: false},
    Thursday: {Shift1: false, Shift2: false, Shift3: false, Shift4: false, Shift5: false, Shift6: false},
    Friday: {Shift1: false, Shift2: false, Shift3: false, Shift4: false, Shift5: false, Shift6: false},
    Saturday: {Shift1: false, Shift2: false, Shift3: false, Shift4: false, Shift5: false, Shift6: false},
})

const tempData = computed(() => {
    return {
        id: props.data ? props.data.id : null,
        namaAsisten: props.data ? props.data.name : '',
        nimAsisten: props.data ? props.data.nim : '',
        semesterAsisten: props.data ? props.data.semester : '',
        shiftData: props.data ? props.data.regular_schedule : '',
    }
})

//Updata form data when props.data is changed
watch(tempData, (value) => {
    formData.namaPartisipan = value.namaAsisten
    formData.nimPartisipan = value.nimAsisten
    formData.semesterAsisten = value.semesterAsisten
    for (const day in shiftData) {
        for (const shift in shiftData[day]) {
            shiftData[day][shift] = value.shiftData[day][shift]
        }
    }

})

//Method
const formReset = () => {
    formData.namaPartisipan = props.data ? props.data.name : ''
    formData.nimPartisipan = props.data ? props.data.nim : ''
    formData.semesterAsisten = props.data ? props.data.semester : ''
    for (const day in shiftData) {
        for (const shift in shiftData[day]) {
            shiftData[day][shift] = props.data ? props.data.regular_schedule[day][shift] : false
        }
    }
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
        // formUpdate()
        console.log(shiftDataToJson())
    } else {
        // formSubmit()
        console.log(shiftDataToJson())
    }
}

//Schedule to JSON
const shiftDataToJson = () => {
    return JSON.stringify(shiftData)
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

        <BaseDivider />

        <div class = "grid grid-cols-1 gap-4">
            <FormField label="Jadwal Kosong Partisipan"
                help="Pilih jadwal kosong yang dimiliki oleh partisipan ini">
                <ShiftSelector v-model="shiftData" />
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