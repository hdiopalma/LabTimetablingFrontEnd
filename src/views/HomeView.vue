<script setup>
import { computed, ref, onMounted } from 'vue'

// Store
import { useMainStore } from '@/stores/main'
import { useSemesterStore } from '@/stores/semester'

// Icons
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiGithub,
} from '@mdi/js'

// Components
import * as chartConfig from '@/components/Charts/chart.config.js'
import SectionMain from '@/components/SectionMain.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableSemester from '@/components/Semester/Table.vue'

const activeSemester= computed(() => semesterStore.activeSemester)

const semesterStore = useSemesterStore()


</script>

<template>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" :title="activeSemester ? activeSemester.name : 'Semester Data'">
        <BaseButton
          href="https://github.com/hdiopalma/jte-lab-timetabling"
          target="_blank"
          :icon="mdiGithub"
          label="Github"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6" v-if="activeSemester">
        <CardBoxWidget
          trend="Jumlah Laboratorium"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="activeSemester.count.laboratory"
          label="Lab"
          :to="{ name: 'lab.index' }"
        />
        <CardBoxWidget
          trend="Jumlah Modul"
          color="text-blue-500"
          :icon="mdiCartOutline"
          :number="activeSemester.count.module"
          label="Modul"
          :to="{ name: 'module.index' }"
        />
        <CardBoxWidget
          trend="Jumlah Kelompok"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="activeSemester.count.group"
          label="Group"
          :to="{ name: 'group.index' }"
        />
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6" v-if="activeSemester">
        <CardBoxWidget
          trend="Jumlah Peserta"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="activeSemester.count.participant"
          label="Partisipan"
          :to="{ name: 'participant.index' }"
        />
        <CardBoxWidget
          trend="Jumlah Asisten"
          color="text-blue-500"
          :icon="mdiCartOutline"
          :number="activeSemester.count.assistant"
          label="Asisten"
          :to="{ name: 'assistant.index' }"
        />
      </div>

      <NotificationBar color="danger" :icon="mdiMonitorCellphone" v-else>
        <b>Perhatian!</b> Tidak ada semester aktif. Silahkan buat atau pilih semester aktif terlebih dahulu.
      </NotificationBar>

      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Data Semester" />

      <CardBox has-table>
        <TableSemester />
      </CardBox>
    </SectionMain>
</template>
