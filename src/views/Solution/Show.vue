<script setup>

//vue
import { reactive, ref, computed, onMounted } from 'vue'

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
  initial_date : '',
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
  await load()
  console.log(data.value.schedule_data)
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

</script>

<template>
  <div>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" :title="pageData.title" main>
        <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast" rounded-full
          small />
      </SectionTitleLineWithButton>
      <ScheduleCalendar :id="data.id" :scheduleData="data.schedule_data" :initialDate="data.initial_date" @dayclick="dayClick" />

      <BaseDivider />

      <SectionTitleLineWithButton :icon="mdiAccount" :title="scheduleTitle" main>
        <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast" rounded-full
          small />
      </SectionTitleLineWithButton>
      <CardBox class="mb-6" has-table>
        <ScheduleTable v-if="Object.keys(scheduleData).length > 0" :data="scheduleData" />
      </CardBox>
      
    </SectionMain>

  </div>
</template>
