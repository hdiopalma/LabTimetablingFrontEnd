<script setup>
import { computed, onMounted, watch } from 'vue'

import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'

const props = defineProps({
  data: { type: Object, required: true }
})

const processedData = computed(() => {
  const result = []
  for (const [date, labs] of Object.entries(props.data.value)) {
    //if labs undefined, skip
    if (!labs) continue
    for (const [lab, modules] of Object.entries(labs)) {
      for (const [module, assistants] of Object.entries(modules)) {
        for (const [assistant, chapters] of Object.entries(assistants)) {
          for (const [chapter, shifts] of Object.entries(chapters)) {
            for (const [shift, groups] of Object.entries(shifts)) {
              for (const group of groups) {
                result.push({ date, lab, module, assistant, chapter, shift, group })
              }
            }
          }
        }
      }
    }
  }
  return result
})

const parentColumns = {
  lab: 'date',
  module: 'lab',
  assistant: 'module',
  chapter: 'assistant',
  shift: 'chapter',
  group: 'shift'
}

function isGroupStart(column, index, row) {
  if (index === 0) return true // First row always starts a new group
  const prevRow = processedData.value[index - 1]
  if (parentColumns.hasOwnProperty(column)) {
    const parentColumn = parentColumns[column]
    return row[column] !== prevRow[column] || row[parentColumn] !== prevRow[parentColumn]
  } else {
    return row[column] !== prevRow[column]
  }
}
</script>

<template>
  <table class="custom-table min-w-full divide-y divide-gray-200 dark:divide-slate-800" v-if="processedData.length > 0">
    <thead>
      <tr>
        <th>Date</th>
        <th>Lab</th>
        <th>Module</th>
        <th>Assistant</th>
        <th>Chapter</th>
        <th>Shift</th>
        <th>Group</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in processedData" :key="index">
        <td v-if="isGroupStart('date', index, row)">{{ row.date }}</td>
        <td v-else></td>
        <td v-if="isGroupStart('lab', index, row)">{{ row.lab }}</td>
        <td v-else></td>
        <td v-if="isGroupStart('module', index, row)">{{ row.module }}</td>
        <td v-else></td>
        <td v-if="isGroupStart('assistant', index, row)">{{ row.assistant }}</td>
        <td v-else></td>
        <td v-if="isGroupStart('chapter', index, row)">{{ row.chapter }}</td>
        <td v-else></td>
        <td v-if="isGroupStart('shift', index, row)">{{ row.shift }}</td>
        <td v-else></td>
        <td>{{ row.group }}</td>
      </tr>
    </tbody>
  </table>
  <CardBoxComponentEmpty v-else />
</template>

<style>
/* Global override to prevent base styles */
:global(.custom-table) {
  all: unset;
  display: table;
}
</style>
