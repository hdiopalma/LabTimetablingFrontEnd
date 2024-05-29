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
        const customData = []
        for (const [shiftKey, labs] of Object.entries(shifts)) {
            for (const [labKey, assistants] of Object.entries(labs)) {
                for (const [assistantKey, modules] of Object.entries(assistants)) {
                    for (const [moduleKey, chapters] of Object.entries(modules)) {
                        //get group from solution object
                        for (const [chapterKey, solutions] of Object.entries(chapters)) {
                            for (const [solutionKey, group] of Object.entries(solutions)) {
                                customData.push({
                                    lab: labKey,
                                    assistant: assistantKey,
                                    module: moduleKey,
                                    chapter: chapterKey,
                                    group: group.group,
                                })
                            }
                        }

                    }
                }
            }
        }
        newAttributes.push({
            dates: formattedDate,
            customData: customData,
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
            <template #popover="{ date, customData }">
                <div class="bg-white p-2 rounded-lg shadow-lg">
                    <div class="text-sm font-semibold text-gray-800">Detail</div>
                    <div class="text-xs text-gray-600">
                        <div v-for="data in customData" :key="data.group">
                            <div>{{ data.lab }} - {{ data.assistant }} - {{ data.module }} - {{ data.chapter }} - {{ data.group }}</div>
                        </div>
                    </div>
                </div>
            </template>
        </Calendar>

    </div>
</template>

<style scoped></style>