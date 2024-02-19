<script setup>
import { computed, ref, onMounted, defineProps } from 'vue'
import { useModuleStore } from '@/stores/module'
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
    semester: String
})

const moduleStore = useModuleStore()

const items = ref([])
onMounted(async () => {
    await moduleStore.fetchModules()
    items.value = moduleStore.items
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

const checked = (isChecked, module) => {
    if (isChecked) {
        checkedRows.value.push(module)
    } else {
        checkedRows.value = remove(checkedRows.value, (row) => module.id === module.id)
    }
}

function dateToReadable(date) {
    // Turn 2022-09-12T07:30:00.530000Z to 12 September 2022
    const d = date.getDate()
    const m = date.toLocaleString('default', { month: 'long' })
    const y = date.getFullYear()
    return `${d} ${m} ${y}`
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
                <th>Laboratory</th>
                <th>Semester</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th />
            </tr>
        </thead>
        <tbody>
            <tr v-for="module in itemsPaginated" :key="module.id">
                <TableCheckboxCell v-if="checkable" @checked="checked($event, module)" />
                <td data-label="Name">
                    {{ module.name }}
                </td>
                <td data-label="Laboratory">
                    {{ module.laboratory.name }}
                </td>
                <td data-label="Semester">
                    {{ module.semester.name }}
                </td>
                <td data-label="Start Date">
                    {{ dateToReadable(new Date(module.start_date)) }}
                </td>
                <td data-label="End Date">
                    {{ dateToReadable(new Date(module.end_date)) }}
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
                <BaseButton v-for="page in pagesList" :key="page" :active="page === currentPage" :label="page + 1"
                    :color="page === currentPage ? 'lightDark' : 'whiteDark'" small @click="currentPage = page" />
            </BaseButtons>
            <small>Page {{ currentPageData }} of {{ numPages }}</small>
        </BaseLevel>
    </div>
</template>
