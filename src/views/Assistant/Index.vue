<script setup>
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiShapeSquarePlus } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableAssistant from '@/components/Assistant/Table.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'

import { useRouter } from 'vue-router'
const router = useRouter()
const goToInput = () => {
  router.push('/assistants/input')
}

</script>

<template>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Assistant Data" main>
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
        <TableAssistant checkable />
      </CardBox>
    </SectionMain>
</template>
