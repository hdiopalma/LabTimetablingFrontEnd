<script setup>

//vue
import { reactive, ref, computed, onMounted } from 'vue'

//icons
import { mdiBallotOutline, mdiAccount, mdiRefresh, mdiAccountBox, mdiFolderAccountOutline, mdiAccountMultiple } from '@mdi/js'

//components
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import FormInputAssistant from '@/components/Assistant/FormInput.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'

//Router
import { useRouter } from 'vue-router'

//Variable
const router = useRouter()

//Store
import { useAssistantStore } from '@/stores/assistant'
const assistantStore = useAssistantStore()

//Props
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
})

//Data
const data = ref({
    id: '',
    name: '',
    nim: '',
    laboratory: '',
    semester: '',
})

//Page Data
const pageData = ref({
    title: 'Assistant',
})

//Load
const load = async () => {
    try {
        const response = await assistantStore.fetchItem(props.id)
        data.value.id = response.id
        data.value.name = response.name
        data.value.nim = response.nim
        data.value.laboratory = response.laboratory.id
        data.value.semester = response.semester.id
        disabled.value = false
    } catch (error) {
        console.log(error)
        router.push({ name: 'assistants' })
    }
}

//Load data before page loaded
onMounted(async () => {
  await load()
})

const goToBack = () => {
  router.go(-1)
}

const disabled = ref(true)

</script>

<template>
    <div>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Lab Form" main>
        <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast" rounded-full
          small />
      </SectionTitleLineWithButton>

      <FormInputAssistant :data="data" :disabled="disabled" :update="true" />

    </SectionMain>

  </div>
</template>