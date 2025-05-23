<script setup>

//vue
import { reactive, ref, computed, onMounted } from 'vue'


import * as XLSX from 'xlsx'
import { useLabStore } from '@/stores/lab'
import { useModuleStore } from '@/stores/module'
import { useChapterStore } from '@/stores/chapter'
import { useAssistantStore } from '@/stores/assistant'

const labStore = useLabStore()
const moduleStore = useModuleStore()
const chapterStore = useChapterStore()
const assistantStore = useAssistantStore()

//icons
import { mdiBallotOutline, mdiAccount, mdiRefresh, mdiAccountBox, mdiFolderAccountOutline, mdiAccountMultiple } from '@mdi/js'

//components
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import FormInputModule from '@/components/Module/FormInput.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import ScheduleCalendar from '@/components/Schedule/Calendar.vue'

//Timetable
import ScheduleTable from '@/components/Schedule/Table.vue'

//store
import { useSolutionStore } from '@/stores/solution'

//Router
import { useRouter } from 'vue-router'
import ShiftSelector from '@/components/CommonForm/ShiftSelector.vue'

//Variable
const router = useRouter()

//Props
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
})

const data = ref({
  id: '',
  name: '',
  semester: '',
  schedule_data: [],
  initial_date: '',
})

const pageData = ref({
  title: 'Solution',
})

//Store
const solutionStore = useSolutionStore()
//Load
const load = async () => {
  try {
    const response = await solutionStore.fetchItem(props.id)
    data.value.id = response.id
    data.value.name = response.name
    data.value.semester = response.semester.id
    data.value.schedule_data = response.schedule_data
    data.value.initial_date = response.initial_date
    pageData.value.title = response.name
    console.log('Schedule data:', data.value.schedule_data)
  } catch (error) {
    console.log(error)
  }
}

const attributes = ref([])

const goToBack = () => {
  router.go(-1)
}

//Lifecycle
onMounted(async () => {
  await Promise.all([
    labStore.fetchItems(),
    moduleStore.fetchItems(),
    chapterStore.fetchItems(),
    assistantStore.fetchItems(),
    load()
  ])
})

const scheduleData = reactive({})
const scheduleTitle = ref('Schedule Details')
const dayClick = (date) => {
  scheduleData.value = {}
  let selectedDate = {}
  selectedDate[date] = data.value.schedule_data[date]
  scheduleData.value = selectedDate
  scheduleTitle.value = `Schedule Details for ${date}`
}

const toToday = () => {
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, '0')
  let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  let yyyy = today.getFullYear()
  let todayDate = yyyy + '-' + mm + '-' + dd
  dayClick(todayDate)
}

const exportExcel = () => {
  // Flatten the data structure
  const rows = []
  for (const [date, labs] of Object.entries(data.value.schedule_data)) {
    if (!labs) continue
    for (const [labId, modules] of Object.entries(labs)) {
      const lab = labStore.itemsName[labId] || 'Unknown Lab'
      for (const [moduleId, chapters] of Object.entries(modules)) {
        const module = moduleStore.itemsName[moduleId] || 'Unknown Module'
        for (const [chapterId, assistants] of Object.entries(chapters)) {
          const chapter = chapterStore.itemsName[chapterId] || 'Unknown Chapter'
          for (const [assistantId, shifts] of Object.entries(assistants)) {
            const assistant = assistantStore.itemsName[assistantId] || 'Unknown Assistant'
            for (const [shift, groups] of Object.entries(shifts)) {
              for (const group of groups) {
                rows.push({
                  Date: date,
                  Lab: lab,
                  Module: module,
                  Chapter: chapter,
                  Assistant: assistant,
                  Shift: shift,
                  Group: group
                })
              }
            }
          }
        }
      }
    }
  }

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows)

  // Create workbook
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Schedule')

  // Export the file
  XLSX.writeFile(workbook, `Schedule_Export_${new Date().toISOString().split('T')[0]}.xlsx`)
}

</script>

<template>
  <div>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" :title="pageData.title" main>
        <div class="flex items-center">

          <BaseButton @click="exportExcel" :icon="mdiRefresh" label="Excel Export" color="contrast"
            class="ml-2 rounded-tl-full rounded-bl-full bg-green-500 hover:bg-green-600 border-green-500" small />
          <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back &nbsp &nbsp &nbsp" color="contrast"
            class="rounded-tr-full rounded-br-full" small />
        </div>

      </SectionTitleLineWithButton>
      <ScheduleCalendar :id="data.id" :scheduleData="data.schedule_data" :initialDate="data.initial_date"
        @dayclick="dayClick" />

      <BaseDivider />

      <SectionTitleLineWithButton :icon="mdiAccount" :title="scheduleTitle" main>
        <BaseButton @click="toToday" target="_blank" :icon="mdiRefresh" label="To Today" color="contrast" rounded-full
          small />
      </SectionTitleLineWithButton>
      <CardBox class="mb-6" has-table>
        <ScheduleTable v-if="Object.keys(scheduleData).length > 0" :data="scheduleData" />
      </CardBox>

    </SectionMain>

  </div>
</template>
