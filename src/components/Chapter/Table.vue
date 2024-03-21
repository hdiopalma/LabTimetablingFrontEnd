<script setup>
import { computed, ref, onMounted, defineProps } from 'vue'
import { useChapterStore } from '@/stores/chapter'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'

defineProps({
    checkable: Boolean,
    all: Boolean,
    group: String,
    chapter: String
})

const chapterStore = useChapterStore()

const items = ref([])
onMounted(async () => {
    await chapterStore.fetchItems()
    items.value = chapterStore.items
})

// const items = computed(() => mainStore.clients)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(10)

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

const checked = (isChecked, chapter) => {
    if (isChecked) {
        checkedRows.value.push(chapter)
    } else {
        checkedRows.value = remove(checkedRows.value, (row) => chapter.id === chapter.id)
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
                <th>Module</th>
                <th>Laboratory</th>
                <th>Semester</th>
                <th />
            </tr>
        </thead>
        <tbody>
            <tr v-for="chapter in itemsPaginated" :key="chapter.id">
                <TableCheckboxCell v-if="checkable" @checked="checked($event, chapter)" />
                <td data-label="Name">
                    {{ chapter.name }}
                </td>
                <td data-label="Module">
                    {{ chapter.module.name }}
                </td>
                <td data-label="Laboratory">
                    {{ chapter.module.laboratory.name }}
                </td>
                <td data-label="Semester">
                    {{ chapter.module.laboratory.semester.name }}
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
