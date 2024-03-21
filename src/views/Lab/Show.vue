<script setup>

//vue
import { reactive, ref, computed, onMounted } from 'vue'

//icons
import { mdiBallotOutline, mdiAccount, mdiRefresh, mdiAccountBox, mdiFolderAccountOutline, mdiAccountMultiple } from '@mdi/js'

//components
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import FormInputLab from '@/components/Lab/FormInput.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'


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
const labStore = useLabStore()

//Data
const data = ref({
  id: '',
  name: '',
  semester: '',
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
  title: 'Lab',
})

//Lab Store
import { useLabStore } from '@/stores/lab'

//Load
const load = async () => {
  try {
    const response = await labStore.fetchItem(props.id)
    data.value.id = response.id
    data.value.name = response.name
    data.value.semester = response.semester.id
    pageData.value.title = 'Lab ' + response.name
    disabled.value = false
  } catch (error) {
    console.log(error)
  }
}

const loadCount = async () => {
  try {
    const response = await labStore.countItem(props.id)
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
  await loadCount()
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

      <FormInputLab :data="data" :disabled="disabled" :update="true" />

    </SectionMain>

    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiFolderAccountOutline" title="Detail" main>

      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <CardBoxWidget trend="Jumlah modul yang tersedia" color="text-emerald-500" :icon="mdiFolderAccountOutline"
          :number="countData.module" suffix=" Modul" label="Module" />
        <CardBoxWidget trend="Asisten yang terdaftar pada semester ini" color="text-yellow-500" :icon="mdiAccountBox"
          :number="countData.assistant" suffix=" Asisten" label="Assistant" />
        <CardBoxWidget trend="Grup yang aktif pada semester ini" color="text-blue-500" :icon="mdiAccount"
          :number="countData.group" suffix=" Grup" label="Group" />
        <CardBoxWidget trend="Peserta yang terdaftar pada semester ini" color="text-red-500" :icon="mdiAccountMultiple"
          :number="countData.participant" suffix=" Peserta" label="Participant" />
      </div>
    </SectionMain>

  </div>
</template>
