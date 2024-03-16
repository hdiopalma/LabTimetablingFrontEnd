<script setup>
import { mdiBallotOutline, mdiRefresh } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import FormInputSemester from '@/components/Semester/FormInput.vue'

import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const goToBack = () => {
  router.push('/semesters')
}


</script>

<template>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Forms Semester" main>
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

      <FormInputSemester />
      
    </SectionMain>
</template>

