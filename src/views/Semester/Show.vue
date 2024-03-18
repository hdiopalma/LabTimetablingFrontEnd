<script setup>

//vue
import { ref, defineProps, onMounted } from 'vue'

//icons
import { mdiChartTimelineVariant, mdiGithub } from '@mdi/js'

//components
import { mdiBallotOutline, mdiRefresh } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import FormInputSemester from '@/components/Semester/FormInput.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'

//store
import { useRouter } from 'vue-router'

//store
import { useSemesterStore } from '@/stores/semester'

const router = useRouter()

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
})

const data = ref({
    id: '',
    name: '',
    status: false
})

const pageData = ref({
  title: 'Semester',
})

const semesterStore = useSemesterStore()

const load = async () => {
  try {
    const response = await semesterStore.fetchSemester(props.id)
    data.value.id = response.id
    data.value.name = response.name
    data.value.status = response.status
    pageData.value.title = 'Semester ' + response.name
  } catch (error) {
    console.log(error)
  }
}

//Load data before page loaded
onMounted(async () => {
  await load()
})


const goToBack = () => {
  router.go(-1)
}


</script>

<template>
    <div>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" :title="pageData.title" main>
        <BaseButton
          @click="goToBack"
          target="_blank"
          :icon="mdiRefresh"
          label="Go back"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <FormInputSemester :data="data" :update="true" />
    </SectionMain>

    <SectionMain>

      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Overview" main>
        
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trend="12%"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="512"
          label="Clients"
        />
        <CardBoxWidget
          trend="12%"
          trend-type="down"
          color="text-blue-500"
          :icon="mdiCartOutline"
          :number="7770"
          prefix="$"
          label="Sales"
        />
        <CardBoxWidget
          trend="Overflow"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="256"
          suffix="%"
          label="Performance"
        />
      </div>
      
    </SectionMain>

    </div>

</template>

