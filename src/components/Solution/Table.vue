<script setup>
//vue
import { computed, ref, onMounted, watch, reactive } from 'vue'

//icons
import { mdiEye, mdiPencilBox } from '@mdi/js'

//store
import { useSolutionStore } from '@/stores/solution'

//components
import PillTag from '@/components/PillTag.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import DeleteModal from '@/components/Action/DeleteModal.vue'
import CardBoxComponentLoading from '@/components/CardBoxComponentLoading.vue'
import FormInputSemester from '@/components/Semester/FormInput.vue'

defineProps({
    checkable: Boolean,
    all: Boolean,
    group: String,
    semester: String
})

const solutionStore = useSolutionStore()

const items = ref([])
const itemsCount = ref(0)
const itemsLoaded = ref(false)
const isFailed = ref(false)

onMounted(async () => {
    try {
        await load()
        await new Promise((resolve) => setTimeout(resolve, 500))
        itemsLoaded.value = true
        isFailed.value = false
    } catch (error) {
        isFailed.value = true
    }
})

const load = async () => {
    await solutionStore.fetchItems(currentPage.value + 1, perPage.value)
    items.value = solutionStore.items
    itemsCount.value = solutionStore.itemsCount
}

const refresh = async () => {
    try {
        await load()
        isFailed.value = false
    } catch (error) {
        isFailed.value = true
    }
}

const handleDeleted = () => {
    refresh()
}

//Pagination
const perPage = ref(5)
const currentPage = ref(0)
const currentPageWatcher = watch(currentPage, () => {
    currentPageData.value = currentPage.value + 1
    refresh()
})
const margin = 2
const numPages = computed(() => Math.ceil(itemsCount.value / perPage.value))
const currentPageData = ref(currentPage.value + 1)
const pagesList = computed(() => {
    const pagesList = []
    // for (let i = 0; i < numPages.value; i++) {
    //     pagesList.push(i)
    // }
    for (let i = 0; i < numPages.value; i++) {
        if (i >= currentPage.value - margin && i <= currentPage.value + margin) {
            pagesList.push(i)
        }
    }
    return pagesList
})

//Display Count for loading
const displayCount = computed(() => {
    return Math.min(localStorage.getItem('solutionCount') || perPage.value, perPage.value)
})

const goToPage = () => {
    const page = parseInt(currentPageData.value) - 1
    console.log(page)
    if (page >= 0 && page < numPages.value) {
        currentPage.value = page
    } else {
        currentPageData.value = currentPage.value + 1
    }
}

const disabledButton = ref(false)

const statusHandler = (status) => {
    return status === 'Pending' ? 'warning' : status === 'Completed' ? 'success' : 'error'
}
</script>

<template>
    <div>
        <CardBoxComponentLoading height="h-12" duration="1.5s" margin="mb-4" v-if="!itemsLoaded"
            v-for="i in displayCount" :key="i" />
        <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Semester</th>
                    <th>Best Fitness</th>
                    <th>Time Elapsed</th>
                    <th>Gene Length</th>
                    <th />
                </tr>
            </thead>
            <tbody class="divide-gray-200 dark:divide-slate-800">
                <tr v-for="solution in items" :key="solution.id">
                    <td data-label="Name">
                        {{ solution.name }}
                    </td>
                    <td data-label="Status" class="flex items-end">
                        <PillTag :label="solution.status" :color="statusHandler(solution.status)" />
                    </td>
                    <td data-label="Semester">
                        {{ solution.semester.name }}
                    </td>
                    <td data-label="Best Fitness">
                        {{ solution.best_fitness ?? '-' }}
                    </td>
                    <td data-label="Time Elapsed">
                        {{ solution.time_elapsed ?? '-' }}
                    </td>
                    <td data-label="Gene Length">
                        {{ solution.gene_count ?? '-' }}
                    </td>
                    <td class="before:hidden lg:w-1 whitespace-nowrap">
                        <BaseButtons type="justify-start lg:justify-end" no-wrap>
                            <BaseButton color="info" :icon="mdiEye" small :disabled="disabledButton"
                                :to="`/solutions/${solution.id}`" />
                            <DeleteModal :id="solution.id" :delete="solutionStore.deleteItem" @onDeleted="handleDeleted"
                            @isLoading="disabledButton = $event"
                            :disabled="disabledButton || solution.status === 'Pending'" />
                        </BaseButtons>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800" v-if="numPages > 1 && itemsLoaded">
            <BaseLevel>
                <BaseButtons>
                    <BaseButton v-if="currentPage > 0" label="First" small @click="currentPage = 0" />
                    <BaseButton v-for="page in pagesList" :key="page" :active="page === currentPage"
                        :label="page === currentPage ? page + 1 : page + 1"
                        :color="page === currentPage ? 'lightDark' : 'whiteDark'" small @click="currentPage = page" />
                    <BaseButton v-if="currentPage < numPages - 1" label="Last" small
                        @click="currentPage = numPages - 1" />
                </BaseButtons>
                <small>Page
                    <input v-model="currentPageData" type="number"
                        class="appearance-none border-blue-500 bottom bg-transparent w-12 text-gray-700 mr-1 ml-1 py-1 px-2 leading-tight focus:outline-none text-center dark:text-gray-300"
                        @keyup.enter="goToPage" :max="numPages" />
                    of
                    {{ numPages }}
                </small>
            </BaseLevel>
        </div>
    </div>
</template>
