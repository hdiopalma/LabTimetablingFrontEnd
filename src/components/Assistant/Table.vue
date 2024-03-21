<script setup>
import { computed, ref, onMounted, defineProps } from 'vue'
import { useAssistantStore } from '@/stores/assistant'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'

defineProps({
    checkable: Boolean
})

const assistantStore = useAssistantStore()

const items = ref([])
onMounted(async () => {
    await assistantStore.fetchItems()
    items.value = assistantStore.items
})

// const items = computed(() => mainStore.clients)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(5)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(() =>
    items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageData = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
    const pagesList = []

    for (let i = 0; i < numPages.value; i++) {
        pagesList.push(i)
    }

    return pagesList
})

const remove = (arr, cb) => {
    const newArr = []

    arr.forEach((item) => {
        if (!cb(item)) {
            newArr.push(item)
        }
    })

    return newArr
}

const checked = (isChecked, assistant) => {
    if (isChecked) {
        checkedRows.value.push(assistant)
    } else {
        checkedRows.value = remove(checkedRows.value, (row) => assistant.id === assistant.id)
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
                <th>Name</th>
                <th>NIM</th>
                <th>Assistant</th>
                <th>Semester</th>
                <th />
            </tr>
        </thead>
        <tbody>
            <tr v-for="assistant in itemsPaginated" :key="assistant.id">
                <TableCheckboxCell v-if="checkable" @checked="checked($event, assistant)" />
                <td data-label="Name">
                    {{ assistant.name }}
                </td>
                <td data-label="NIM">
                    {{ assistant.nim }}
                </td>
                <td data-label="Assistant">
                    {{ assistant.laboratory.name }}
                </td>
                <td data-label="Semester">
                    {{ assistant.semester.name }}
                </td>
                <td class="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons type="justify-start lg:justify-end" no-wrap>
                        <BaseButton color="info" :icon="mdiEye" small @click="isModalActive = true" />
                        <BaseButton color="danger" :icon="mdiTrashCan" small @click="isModalDangerActive = true" />
                    </BaseButtons>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
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
      <small>Page {{ currentPageData }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
