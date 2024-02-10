<script setup>
import { computed, ref, onMounted, defineProps } from 'vue'
import { useLabStore } from '@/stores/lab'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'

defineProps({
  checkable: Boolean
})

const labStore = useLabStore()

const items = ref([])
onMounted(async () => {
  await labStore.fetchLabs()
  items.value = labStore.items
  // console.log("From IndexLab.vue: ", items.value)
})

// const items = computed(() => mainStore.clients)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(5)

const currentPage = ref(0)

const checkedRows = ref([])

// const itemsPaginated = computed(() =>
//   items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
// )

// const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

// const currentPageHuman = computed(() => currentPage.value + 1)

// const pagesList = computed(() => {
//   const pagesList = []

//   for (let i = 0; i < numPages.value; i++) {
//     pagesList.push(i)
//   }

//   return pagesList
// })

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, lab) => {
  if (isChecked) {
    checkedRows.value.push(lab)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => lab.id === lab.id)
  }
}
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>URL</th>
        <th>Name</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="lab in items" :key="lab.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, lab)" />
        <td data-label="URL">
          {{ lab.url }}
        </td>
        <td data-label="Name">
          {{ lab.name }}
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="info" :icon="mdiEye" small @click="isModalActive = true" />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div> -->
</template>
