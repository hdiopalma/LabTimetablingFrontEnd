<script setup>

//vue
import { ref, defineProps, onMounted } from 'vue'

//icons
import { mdiAccountMultiple, mdiAccount, mdiFolderAccountOutline } from '@mdi/js'

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

const countData = ref({
  module: 0,
  group: 0,
  participant: 0
})

const disabled = ref(true)

const pageData = ref({
  title: 'Semester',
})

const semesterStore = useSemesterStore()

const load = async () => {
  try {
    const response = await semesterStore.fetchItem(props.id, 'all')
    data.value.id = response.id
    data.value.name = response.name
    data.value.status = response.status
    countData.value.module = response.count.module
    countData.value.group = response.count.group
    countData.value.participant = response.count.participant
    pageData.value.title = 'Semester ' + response.name
    disabled.value = false
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

      <FormInputSemester :data="data" :update="true" :disabled="disabled" />
    </SectionMain>

    <SectionMain>

      <SectionTitleLineWithButton :icon="mdiFolderAccountOutline" title="Detail" main>
        
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trend="Jumlah modul yang tersedia"
          color="text-emerald-500"
          :icon="mdiFolderAccountOutline"
          :number="countData.module"
          suffix=" Modul"
          label="Module"
        />
        <CardBoxWidget
          trend="Grup yang aktif pada semester ini"
          color="text-blue-500"
          :icon="mdiAccount"
          :number="countData.group"
          suffix=" Grup"
          label="Group"
        />
        <CardBoxWidget
          trend="Peserta yang terdaftar pada semester ini"
          color="text-red-500"
          :icon="mdiAccountMultiple"
          :number="countData.participant"
          suffix=" Peserta"
          label="Participant"
        />
      </div>
      
    </SectionMain>

    </div>

</template>

