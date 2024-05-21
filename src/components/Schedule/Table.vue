<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: { type: Object, required: true },
});

const processedData = computed(() => {
  const result = [];
  if(!props.data.value) return result;
  for (const [date, labs] of Object.entries(props.data.value)) {
    for (const [lab, assistants] of Object.entries(labs)) {
      for (const [assistant, modules] of Object.entries(assistants)) {
        for (const [module, chapters] of Object.entries(modules)) {
          for (const [chapter, shifts] of Object.entries(chapters)) {
            for (const [shift, groups] of Object.entries(shifts)) {
              for (const group of groups) {
                result.push({ date, lab, assistant, module, chapter, shift, group });
              }
            }
          }
        }
      }
    }
  }
  console.log(result);
  return result;
});

const parentColumns = {
  lab: 'date',
  assistant: 'lab',
  module: 'assistant',
  chapter: 'module',
  shift: 'chapter',
};

function isGroupStart(column, index, row) {
  if (index === 0) return true; // First row always starts a new group
  const prevRow = processedData.value[index - 1];
  if (parentColumns.hasOwnProperty(column)) {
    const parentColumn = parentColumns[column];
    return row[column] !== prevRow[column] || row[parentColumn] !== prevRow[parentColumn];
  } else {
    return row[column] !== prevRow[column];
  }
}

//isLastRow
function isLastRow(index) {
  return index === processedData.value.length - 1;
}



</script>

<template>
  <table class="custom-table min-w-full divide-y divide-gray-200 dark:divide-slate-800">
    <thead>
      <tr>
        <th>Date</th>
        <th>Lab</th>
        <th>Assistant</th>
        <th>Module</th>
        <th>Chapter</th>
        <th>Shift</th>
        <th>Group</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in processedData" :key="index" :class="{ 'border-b': !isLastRow(index) }">
        <td v-if="isGroupStart('date', index, row)">{{ row.date }}</td>
        <td v-else></td>
        <td v-if="isGroupStart('lab', index, row)">{{ row.lab }}</td>
        <td v-else></td>
        <td v-if="isGroupStart('assistant', index, row)" :class="{ 'border-b': !isLastRow(index) }">
          {{ row.assistant }}
        </td>
        <td v-else></td>
        <td v-if="isGroupStart('module', index, row)">{{ row.module }}</td>
        <td v-else></td>
        <td v-if="isGroupStart('chapter', index, row)">{{ row.chapter }}</td>
        <td v-else></td>
        <td v-if="isGroupStart('shift', index, row)">{{ row.shift }}</td>
        <td v-else></td>
        <td>{{ row.group }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style>
/* Global override to prevent base styles */
:global(.custom-table) {
  all: unset;
  display: table;
}
</style>
