<script setup>

//vue
import { reactive, ref, computed, onMounted } from 'vue'

//icons
import { mdiBallotOutline, mdiAccount, mdiRefresh, mdiAccountBox, mdiFolderAccountOutline, mdiAccountMultiple } from '@mdi/js'

//components
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import FormInputChapter from '@/components/Chapter/FormInput.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'

//Lab Store
import { useChapterStore } from '@/stores/chapter'


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
const chapterStore = useChapterStore()

//Data
const data = ref({
    id: '',
    name: '',
    module: '',
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
  title: 'Chapter',
})

//Load
const load = async () => {
  try {
    const response = await chapterStore.fetchItem(props.id)
    data.value.id = response.id
    data.value.name = response.name
    data.value.module = response.module
    pageData.value.title = 'Module ' + response.name
    disabled.value = false
  } catch (error) {
    console.log(error)
  }
}

const loadCount = async () => {
  try {
    const response = await chapterStore.countItem(props.id)
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

      <FormInputChapter :data="data" :disabled="disabled" :update="true" />

    </SectionMain>

  </div>
</template>
