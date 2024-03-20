<script setup>
//Icon
import { mdiAccount } from '@mdi/js'

//Vue
import { reactive, ref, computed, defineProps, watch, toRef, defineEmits } from 'vue'

//Component
import CardBox from '@/components/CardBox.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'

import SemesterSelectOption from '@/components/Semester/SelectOption.vue'

//Store
import { useLabStore } from '@/stores/lab'

//Router
import { useRouter } from 'vue-router'

//Sweetalert2
import Swal from 'sweetalert2'

//Variable
const router = useRouter()
const labStore = useLabStore()

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
    namaLab: '',
    semesterLab: '',
})

const tempData = computed(() => {
    return {
        id: props.data ? props.data.id : null,
        namaLab: props.data ? props.data.name : '',
        semesterLab: props.data ? props.data.semester : '',
    }
})

//Updata form data when props.data is changed
watch(tempData, (value) => {
    formData.namaLab = value.namaLab
    formData.semesterLab = value.semesterLab
})

//Method
const formReset = () => {
    formData.namaLab = props.data ? props.data.name : ''
    formData.semesterLab = props.data ? props.data.semester : ''
}


//Submit
//Database operation
const formSubmit = async () => {
    const data = {
        name: formData.namaLab,
        semester: formData.semesterLab,
    }
    try {
        const response = await labStore.addLab(data)
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
        name: formData.namaLab,
        semester: formData.semesterLab,
    }
    try {
        const response = await labStore.updateLab(data)
        if (response.status === 200) {
            successAlert()
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
    <CardBox is-form @submit.prevent="submit" @reset.prevent="formReset">

        <div class="grid grid-cols-1 gap-4 ">
            <FormField label="Nama Laboratorium" help="Nama laboratorium yang akan diinputkan" labelFor="namaLab">
                <FormControl :icon="mdiAccount" placeholder="E.g: Lab Kendali" name="namaLab"
                    v-model="formData.namaLab" />
            </FormField>

            <FormField label="Semester Aktif" labelFor="semesterLab" help="Pilih semester dimana laboratorium ini aktif">
                        <SemesterSelectOption name="semesterLab" v-model="formData.semesterLab" />
            </FormField>


        </div>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" :label="update ? 'Update' : 'Submit'" :disabled="props.disabled" />
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
    </CardBox>
</template>