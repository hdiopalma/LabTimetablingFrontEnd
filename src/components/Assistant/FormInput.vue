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
        labAsisten: props.data ? props.data.laboratory : '',
        semesterAsisten: props.data ? props.data.semester : '',
        shiftData: props.data ? props.data.regular_schedule : '',
    }
})

//Updata form data when props.data is changed
watch(tempData, (value) => {
    formData.namaAsisten = value.namaAsisten
    formData.nimAsisten = value.nimAsisten
    formData.labAsisten = value.labAsisten
    formData.semesterAsisten = value.semesterAsisten
    for (const day in shiftData) {
        for (const shift in shiftData[day]) {
            shiftData[day][shift] = value.shiftData[day][shift]
        }
    }

})

//Method
const formReset = () => {
    formData.namaAsisten = props.data ? props.data.name : ''
    formData.nimAsisten = props.data ? props.data.nim : ''
    formData.labAsisten = props.data ? props.data.laboratory : ''
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
        name: formData.namaAsisten,
        nim: formData.nimAsisten,
        laboratory: formData.labAsisten,
        semester: formData.semesterAsisten,
        regular_schedule: shiftData,
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
        regular_schedule: shiftData,
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
            router.push('/assistants')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            router.push('/assistants/' + id)
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
    <CardBox form @submit.prevent="submit" @reset.prevent="formReset" isForm>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Nama Asisten">
                <FormControl :icon="mdiAccount" placeholder="Nama Asisten" name="namaAsisten" v-model="formData.namaAsisten" />
            </FormField>

            <FormField label="NIM Asisten">
                <FormControl :icon="mdiAccountBox" placeholder="NIM Asisten" name="nimAsisten" type="number" v-model="formData.nimAsisten" />
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

        <div class = "grid grid-cols-1 gap-4">
            <FormField label="Jadwal Kosong Asisten"
                help="Pilih jadwal kosong yang dimiliki oleh asisten ini">
                <ShiftSelector v-model="shiftData" />
            </FormField>
        </div>

        <template #footer>
            <BaseButtons>
                <BaseButton type="submit" color="info" :label="props.update ? 'Update' : 'Simpan'" />
                <BaseButton type="reset" color="info" outline label="Reset" />
            </BaseButtons>
        </template>
    </CardBox>
</template>