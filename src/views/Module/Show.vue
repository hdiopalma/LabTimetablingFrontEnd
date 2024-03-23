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

//Lab Store
import { useModuleStore } from '@/stores/module'


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

//Store
const moduleStore = useModuleStore()

//Data
const data = ref({
    id: '',
    name: '',
    laboratory: '',
    start_date: '',
    end_date: '',
})


//Count Data
const countData = ref({
  module: 0,
  group: 0,
  participant: 0,
  assistant: 0
})

const disabled = ref(true)

const pageData = ref({
  title: 'Module',
})

//Load
const load = async () => {
  try {
    const response = await moduleStore.fetchItem(props.id)
    data.value.id = response.id
    data.value.name = response.name
    data.value.laboratory = response.laboratory.id
    data.value.start_date = response.start_date
    data.value.end_date = response.end_date
    pageData.value.title = 'Module ' + response.name
    disabled.value = false
  } catch (error) {
    console.log(error)
  }
}

const loadCount = async () => {
  try {
    const response = await moduleStore.countItem(props.id)
    countData.value.module = response.module_count
    countData.value.group = response.group_count
    countData.value.participant = response.participant_count
    countData.value.assistant = response.assistant_count
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
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Lab Form" main>
        <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast" rounded-full
          small />
      </SectionTitleLineWithButton>

      <FormInputModule :data="data" :disabled="disabled" :update="true" />

    </SectionMain>

  </div>
</template>
