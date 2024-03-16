
<script setup>
//Icon
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiGithub, mdiShapeSquarePlus } from '@mdi/js'

//Vue
import { ref, defineAsyncComponent } from 'vue'

//Component
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableParticipant from '@/components/Participant/Table.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentLoading from '@/components/CardBoxComponentLoading.vue'

import { useRouter } from 'vue-router'

//Variable
const router = useRouter()
const AsyncTableParticipant = defineAsyncComponent(({
  loader: () => import('@/components/Participant/Table.vue'),
  loadingComponent: CardBoxComponentLoading,
  delay: 200,
  timeout: 3000,
  errorComponent: {
    render() {
      return h('div', 'Error! Component loading failed.')
    },
  },
}))


const goToInput = () => {
  router.push('/participants/input')
}

</script>

<template>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Participant Data" main>
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
        <!-- <TableParticipant /> -->
        <AsyncTableParticipant />
      </CardBox>
    </SectionMain>
</template>
