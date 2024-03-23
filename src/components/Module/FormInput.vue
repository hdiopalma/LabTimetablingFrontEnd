<script setup>
//Icon
import { mdiAccount, mdiAccountBox, mdiCalendar } from '@mdi/js'

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
import { useModuleStore } from '@/stores/module'    

//Router
import { useRouter } from 'vue-router'

//Sweetalert2
import Swal from 'sweetalert2'

//Variable
const router = useRouter()
const labStore = useLabStore()
const semesterStore = useSemesterStore()
const assistantStore = useAssistantStore()
const moduleStore = useModuleStore()

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
    namaModul: '',
    labModul: '',
    startModule: '',
    endModule: '',
})

const tempData = computed(() => {
    return {
        id: props.data ? props.data.id : null,
        namaModul: props.data ? props.data.name : '',
        labModul: props.data ? props.data.laboratory : '',
        startModule: props.data ? props.data.start_date : '',
        endModule: props.data ? props.data.end_date : '',
    }
})

//Updata form data when props.data is changed, throgh tempData to make it reactive
watch(tempData, (value) => {
    formData.namaModul = value.namaModul
    formData.labModul = value.labModul
    formData.startModule = dateToReadable(value.startModule)
    formData.endModule = dateToReadable(value.endModule)
})

//Method
const formReset = () => {
    formData.namaModul = props.data ? props.data.name : ''
    formData.labModul = props.data ? props.data.laboratory.id : ''
    formData.startModule = props.data ? props.data.start_date : ''
    formData.endModule = props.data ? props.data.end_date : ''
}


//Submit
//Database operation
const formSubmit = async () => {
    const data = {
        name: formData.namaModul,
        laboratory: formData.labModul,
        start_date: formData.startModule,
        end_date: formData.endModule,
    }
    try {
        const response = await moduleStore.addItem(data)
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
        name: formData.namaModul,
        laboratory: formData.labModul,
        start_date: formData.startModule,
        end_date: formData.endModule,
    }
    try {
        const response = await moduleStore.updateItem(data)
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
            router.push('/modules')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            router.push('/modules/' + id)
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

const dateToReadable = (date) => {
    return new Date(date).toISOString().split('T')[0]
}

</script>

<template>
    <CardBox isForm @submit.prevent="submit" @reset.prevent="formReset">

        <div class="grid grid-cols-1 gap-4 xl:grid-cols-2 md:grid-cols-2">
            <FormField label="Nama Module" help="Nama modul yang akan diajarkan">
                <FormControl :icon="mdiAccount" placeholder="E.g: Pengukuran Listrik" name="namaModule"
                    v-model="formData.namaModul" />
            </FormField>

            <FormField label="Laboratorium" labelFor="labModul"
                help="Pilih laboratorium dari modul yang akan diajarkan">
                <SelectOption name="labModul" :store="labStore" v-model="formData.labModul" />
            </FormField>

        </div>

        <BaseDivider />

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Start Date" help="Tanggal dimulainya modul ini">
                <FormControl :icon="mdiCalendar" name="startModule" type="date"
                    v-model="formData.startModule" />
            </FormField>

            <FormField label="End Date" help="Tanggal berakhirnya modul ini">
                <FormControl :icon="mdiCalendar" name="endModule" type="date" v-model="formData.endModule" />
            </FormField>

        </div>

        <template #footer>
            <BaseButtons>
                <BaseButton type="submit" color="info" :label="props.update ? 'Update' : 'Submit'" />
                <BaseButton type="reset" color="info" outline label="Reset" />
            </BaseButtons>
        </template>
    </CardBox>
</template>