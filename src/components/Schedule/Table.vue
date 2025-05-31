<script setup>
import { computed, onMounted } from 'vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import { useSolutionStore } from '@/stores/solution'
import { useLabStore } from '@/stores/lab'
import { useModuleStore } from '@/stores/module'
import { useChapterStore } from '@/stores/chapter'
import { useAssistantStore } from '@/stores/assistant'

const props = defineProps({
  data: { type: Object, required: true }
})

const labStore = useLabStore()
const moduleStore = useModuleStore()
const chapterStore = useChapterStore()
const assistantStore = useAssistantStore()

onMounted(() => {
  labStore.fetchItems()
  moduleStore.fetchItems()
  chapterStore.fetchItems()
  assistantStore.fetchItems()
})

const parentColumns = {
  lab: 'date',
  module: 'lab',
  chapter: 'module',
  assistant: 'chapter',
  shift: 'assistant',
}

const processedData = computed(() => {
  const result = []
  // Flatten the nested data structure
  for (const [date, labs] of Object.entries(props.data.value)) {
    if (!labs) continue
    for (const [lab, modules] of Object.entries(labs)) {
      for (const [module, chapters] of Object.entries(modules)) {
        for (const [chapter, assistants] of Object.entries(chapters)) {
          for (const [assistant, shifts] of Object.entries(assistants)) {
            for (const [shift, groups] of Object.entries(shifts)) {
              for (const group of groups) {
                result.push({ date, lab, module, chapter, assistant, shift, group })
              }
            }
          }
        }
      }
    }
  }

  // Calculate row spans for hierarchical columns
  const columns = ['date', 'lab', 'module', 'chapter', 'assistant', 'shift']
  result.forEach((row, index) => {
    row.spans = {}
    columns.forEach(col => {
      let isStart = false
      if (index === 0) {
        isStart = true
      } else {
        const prevRow = result[index - 1]
        const parentCol = parentColumns[col]
        if (parentCol) {
          isStart = row[col] !== prevRow[col] || row[parentCol] !== prevRow[parentCol]
        } else {
          isStart = row[col] !== prevRow[col]
        }
      }

      if (isStart) {
        let span = 1
        for (let j = index + 1; j < result.length; j++) {
          const nextRow = result[j]
          let currentCol = col
          let same = true
          while (currentCol) {
            if (nextRow[currentCol] !== row[currentCol]) {
              same = false
              break
            }
            currentCol = parentColumns[currentCol]
          }
          if (same) span++
          else break
        }
        row.spans[col] = span
      } else {
        row.spans[col] = 0
      }
    })
  })

  return result
})

const labName = (id) => labStore.itemsName[id] || 'Unknown Lab'
const moduleName = (id) => moduleStore.itemsName[id] || 'Unknown Module'
const chapterName = (id) => chapterStore.itemsName[id] || 'Unknown Chapter'
const assistantName = (id) => assistantStore.itemsName[id] || 'Unknown Assistant'
</script>

<template>
  <table class="w-full" v-if="processedData.length > 0">
    <thead class="hidden md:table-header-group">
      <tr class="md:table-row">
        <th class="md:text-left md:p-3">Date</th>
        <th class="md:text-left md:p-3">Lab</th>
        <th class="md:text-left md:p-3">Module</th>
        <th class="md:text-left md:p-3">Chapter</th>
        <th class="md:text-left md:p-3">Assistant</th>
        <th class="md:text-left md:p-3">Shift</th>
        <th class="md:text-left md:p-3">Group</th>
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="(row, index) in processedData" 
        :key="index"
        class="max-w-full block relative border-b-4 border-gray-100 md:table-row md:border-b-0 dark:border-slate-800"
      >
        <td 
          v-if="row.spans.date > 0" 
          :rowspan="row.spans.date"
          data-label="Date"
          class="flex justify-between text-right py-3 px-4 align-top border-b border-gray-100 md:table-cell md:text-left md:p-3 md:align-middle md:border-b-0 dark:border-slate-800"
        >
          {{ row.date }}
        </td>
        
        <td 
          v-if="row.spans.lab > 0" 
          :rowspan="row.spans.lab"
          data-label="Lab"
          class="flex justify-between text-right py-3 px-4 align-top border-b border-gray-100 md:table-cell md:text-left md:p-3 md:align-middle md:border-b-0 dark:border-slate-800"
        >
          {{ labName(row.lab) }}
        </td>

        <td 
          v-if="row.spans.module > 0" 
          :rowspan="row.spans.module"
          data-label="Module"
          class="flex justify-between text-right py-3 px-4 align-top border-b border-gray-100 md:table-cell md:text-left md:p-3 md:align-middle md:border-b-0 dark:border-slate-800"
        >
          {{ moduleName(row.module) }}
        </td>

        <td 
          v-if="row.spans.chapter > 0" 
          :rowspan="row.spans.chapter"
          data-label="Chapter"
          class="flex justify-between text-right py-3 px-4 align-top border-b border-gray-100 md:table-cell md:text-left md:p-3 md:align-middle md:border-b-0 dark:border-slate-800"
        >
          {{ chapterName(row.chapter) }}
        </td>

        <td 
          v-if="row.spans.assistant > 0" 
          :rowspan="row.spans.assistant"
          data-label="Assistant"
          class="flex justify-between text-right py-3 px-4 align-top border-b border-gray-100 md:table-cell md:text-left md:p-3 md:align-middle md:border-b-0 dark:border-slate-800"
        >
          {{ assistantName(row.assistant) }}
        </td>

        <td 
          v-if="row.spans.shift > 0" 
          :rowspan="row.spans.shift"
          data-label="Shift"
          class="flex justify-between text-right py-3 px-4 align-top border-b border-gray-100 md:table-cell md:text-left md:p-3 md:align-middle md:border-b-0 dark:border-slate-800"
        >
          {{ row.shift }}
        </td>

        <td 
          data-label="Group"
          class="flex justify-between text-right py-3 px-4 align-top border-b border-gray-100 md:table-cell md:text-left md:p-3 md:align-middle md:border-b-0 dark:border-slate-800"
        >
          {{ row.group }}
        </td>
      </tr>
    </tbody>
  </table>
  <CardBoxComponentEmpty v-else />

  

</template>