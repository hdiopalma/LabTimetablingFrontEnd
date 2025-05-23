<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue'
import { Calendar, DatePicker } from 'v-calendar'

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    scheduleData: {
        type: Object,
        required: true
    },
    initialDate: {
        type: String,
        required: true
    }
})

const emits = defineEmits(['dayclick'])
const dayClick = (data) => {
    emits('dayclick', data.id)
}

const scheduleDataToCalendar = (calendarData) => {
    const newAttributes = []
    let key = 0
    for (const [dateKey, shifts] of Object.entries(calendarData)) {
        const formattedDate = new Date(dateKey)
        newAttributes.push({
            dates: formattedDate,
            key: key++,
            dot: true,
            popover: true,
        })
    }
    return newAttributes
}
//initialPage for calendar, get the first data from scheduleData
const calendar = ref(null)
const initialPage = ref()
const attributes = ref()

watch(() => props.scheduleData, (newVal) => {
    attributes.value = scheduleDataToCalendar(newVal)
    moveToInitialPage()
})

async function moveToInitialPage() {
    initialPage.value = { month: new Date(props.initialDate).getMonth() + 1, year: new Date(props.initialDate).getFullYear() }
    await calendar.value.move(initialPage.value)
}

</script>

<template>
    <div>
        <Calendar expanded :rows="1" :columns="2" :attributes="attributes" :initial-page="initialPage" ref="calendar" @dayclick="dayClick">
        </Calendar>

    </div>
</template>

<style scoped></style>