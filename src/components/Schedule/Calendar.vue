<script setup>
import { ref, onMounted } from 'vue'
import { Calendar, DatePicker } from 'v-calendar'

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    scheduleData: {
        type: Array,
        required: true
    }
})

</script>

<template>
    <div>
        <Calendar expanded :rows="2" :columns="3">
            
        </Calendar>
    </div>
</template>