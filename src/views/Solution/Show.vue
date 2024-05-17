<script setup>

//vue
import { reactive, ref, computed, onMounted } from 'vue'

//icons
import { mdiBallotOutline, mdiAccount, mdiRefresh, mdiAccountBox, mdiFolderAccountOutline, mdiAccountMultiple } from '@mdi/js'

//components
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import FormInputModule from '@/components/Module/FormInput.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import ScheduleCalendar from '@/components/Schedule/Calendar.vue'

//store
import { useSolutionStore } from '@/stores/solution'

//Router
import { useRouter } from 'vue-router'

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
    pageData.value.title = response.name
    console.log(response.name)
  } catch (error) {
    console.log(error)
  }
}


const goToBack = () => {
  router.go(-1)
}

//Lifecycle
onMounted(async () => {
  await load()
})

</script>

<template>
  <div>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" :title="pageData.title" main>
        <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast" rounded-full
          small />
      </SectionTitleLineWithButton>

      <ScheduleCalendar />
    </SectionMain>

  </div>
</template>
