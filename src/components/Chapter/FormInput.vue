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

import { useModuleStore } from '@/stores/module'
import { useChapterStore } from '@/stores/chapter'

//Router
import { useRouter } from 'vue-router'

//Sweetalert2
import Swal from 'sweetalert2'

//Variable
const router = useRouter()
const moduleStore = useModuleStore()
const chapterStore = useChapterStore()

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
    namaChapter: '',
    moduleChapter: '',
})

const tempData = computed(() => {
    return {
        id: props.data ? props.data.id : null,
        namaChapter: props.data ? props.data.name : '',
        moduleChapter: props.data ? props.data.module.id : '',
    }
})

//Updata form data when props.data is changed, throgh tempData to make it reactive
watch(tempData, (value) => {
    formData.namaChapter = value.namaChapter
    formData.moduleChapter = value.moduleChapter
})

//Method
const formReset = () => {
    formData.namaChapter = props.data ? props.data.name : ''
    formData.moduleChapter = props.data ? props.data.module.id : ''
}


//Submit
//Database operation
const formSubmit = async () => {
    const data = {
        name: formData.namaChapter,
        module: formData.moduleChapter,
    }
    try {
        const response = await chapterStore.addItem(data)
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
        name: formData.namaChapter,
        module: formData.moduleChapter,
    }
    try {
        const response = await chapterStore.updateItem(data)
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
            router.push('/chapters')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            router.push('/chapters/' + id)
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
    <CardBox @submit.prevent="submit" isForm @reset.prevent="formReset">

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Nama Chapter" help="Nama chapter dari modul yang akan diinputkan" labelFor="namaChapter">
                <FormControl :icon="mdiAccount" placeholder="E.g: Unit 1: Volt Meter" name="namaChapter"
                    v-model="formData.namaChapter" />
            </FormField>

            <FormField label="Module" labelFor="moduleChapter" help="Pilih modul dari daftar modul yang tersedia">
                <SelectOption name="moduleChapter" :store="moduleStore" v-model="formData.moduleChapter" />
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