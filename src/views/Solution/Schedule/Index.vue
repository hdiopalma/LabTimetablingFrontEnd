<script setup>

//icon
import { mdiBallotOutline, mdiRefresh } from '@mdi/js'

//components
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
})

const goToBack = () => {
  router.go(-1)
}
</script>

<template>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Lab Form" main>
        <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast" rounded-full
          small />
      </SectionTitleLineWithButton>
    </SectionMain>
</template>