<script setup>
import { computed, defineEmits, defineProps } from 'vue'
import Swal from 'sweetalert2'
import BaseButton from '@/components/BaseButton.vue'
import { mdiTrashCan } from '@mdi/js'

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    delete: {
        type: Function,
        required: true
    },
})

const emits = defineEmits(['onDeleted'])

const confirm = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this record!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // console.log('Delete', props.id)
            handleDelete(props.id)
        }
    })
}

const handleDelete = async (id) => {
    try {
        const response = await props.delete(id)
        if (response.status === 200 || response.status === 204) {
            Swal.fire('Deleted!', 'Your record has been deleted.', 'success')
            emits('onDeleted')
        } else {
            Swal.fire('Error!', response.data.message, 'error')
        }
    } catch (error) {
        Swal.fire('Error!', error.message, 'error')
    }
}

</script>

<template>
    <BaseButton color="danger" :icon="mdiTrashCan" small @click="confirm" />
</template>