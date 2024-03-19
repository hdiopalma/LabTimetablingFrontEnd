
<script setup>
//icons
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiGithub, mdiShapeSquarePlus } from '@mdi/js'

//components
import SectionMain from '@/components/SectionMain.vue'
import TableSemester from '@/components/Semester/Table.vue'
import CardBox from '@/components/CardBox.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
// import { useSemesterStore } from '@/stores/semester'

// import router for semesters
// import { useSemesterStore } from '@/stores/semester'
// import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// const semesterStore = useSemesterStore()
// const store = useStore()
const router = useRouter()
const goToInput = () => {
  router.push('/semesters/input')
}



// const deleteSemester = async (id) => {
//   await semesterStore.deleteSemester(id)
//   await store.dispatch('semester/fetchSemesters')
// }

</script>

<template>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Semester Data" main>
        <BaseButton
          @click="goToInput"
          target="_blank"
          :icon="mdiShapeSquarePlus"
          label="Input New Data"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableSemester />
      </CardBox>
    </SectionMain>
</template>
