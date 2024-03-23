<script setup>
//vue
import { computed, ref, onMounted, defineProps, watch, reactive } from 'vue'

//icons
import { mdiEye, mdiTrashCan, mdiPencilBox } from '@mdi/js'

//store
import { useModuleStore } from '@/stores/module'

//components
import CardBoxModal from '@/components/CardBoxModal.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentLoading from '@/components/CardBoxComponentLoading.vue'
import FormInputModule from '@/components/Module/FormInput.vue'
import DeleteModal from '@/components/Action/DeleteModal.vue'


defineProps({
    checkable: Boolean,
    all: Boolean,
    group: String,
    lab: String
})

const moduleStore = useModuleStore()

const items = ref([])
const itemsCount = ref(0)
const itemsLoaded = ref(false)
const isFailed = ref(false)

onMounted(async () => {
    try {
        await load()
        await new Promise(resolve => setTimeout(resolve, 500))
        itemsLoaded.value = true
        isFailed.value = false
        
    } catch (error) {
        isFailed.value = true
    }
})

const load = async () => {
    await moduleStore.fetchItems(currentPage.value + 1, perPage.value)
    items.value = moduleStore.items
    itemsCount.value = moduleStore.itemsCount
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

//Update Data Reactive
const dataUpdate = reactive({
    id: '',
    name: '',
    semester: '',
    laboratory: '',
    start_date: '',
    end_date: '',
})

const computedData = computed(() => {
    return dataUpdate
})

const fillData = (module) => {
    dataUpdate.id = module.id
    dataUpdate.name = module.name
    dataUpdate.semester = module.laboratory.semester.id
    dataUpdate.laboratory = module.laboratory.id
    dataUpdate.start_date = module.start_date
    dataUpdate.end_date = module.end_date
}

//handle Update
const handleUpdate = (lab) => {
    fillData(lab)
    isModalActive.value = true
}


//Modal
const isModalActive = ref(false)
const isModalDangerActive = ref(false)

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
    for (let i = 0; i < numPages.value; i++) {
        if ((i >= currentPage.value - margin && i <= currentPage.value + margin)) {
            pagesList.push(i)
        }
    }
    return pagesList
})

//Display Count for loading
const displayCount = computed(() => {
    return Math.min(localStorage.getItem('moduleCount') || perPage.value, perPage.value)
})

const goToPage = () => {
    const page = parseInt(currentPageData.value) - 1
    if (page >= 0 && page < numPages.value) {
        currentPage.value = page
    } else {
        currentPageData.value = currentPage.value + 1
    }
}

//Button
const disabledButton = ref(false)

//Helper
const dateToReadable = (date) => {
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

// function dateToReadable(date) {
//     // Turn 2022-09-12T07:30:00.530000Z to 12 September 2022
//     const d = date.getDate()
//     const m = date.toLocaleString('default', { month: 'long' })
//     const y = date.getFullYear()
//     return `${d} ${m} ${y}`
// }

</script>

<template>
    <CardBoxModal v-model="isModalActive" title="Update Data Assistant" :hasFooter=false has-cancel is-scrollable>
        <FormInputModule :data="computedData" update @dataUpdated="isModalActive = false" />
    </CardBoxModal>

    <CardBoxComponentLoading height="h-12" duration="1.5s" margin="mb-4" v-if="!itemsLoaded" v-for="i in displayCount"
        :key="i" />

    <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
        <thead>
            <tr>
                <th>Name</th>
                <th>Laboratory</th>
                <th>Semester</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th />
            </tr>
        </thead>
        <tbody>
            <tr v-for="module in items" :key="module.id">
                <td data-label="Name">
                    {{ module.name }}
                </td>
                <td data-label="Laboratory">
                    {{ module.laboratory.name }}
                </td>
                <td data-label="Semester">
                    {{ module.laboratory.semester.name }}
                </td>
                <td data-label="Start Date">
                    {{ dateToReadable(new Date(module.start_date)) }}
                </td>
                <td data-label="End Date">
                    {{ dateToReadable(new Date(module.end_date)) }}
                </td>
                <td class="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons type="justify-start lg:justify-end" no-wrap>
                        <BaseButton color="info" :icon="mdiEye" small :disabled="disabledButton"
                            :to="`/modules/${module.id}`" />
                        <BaseButton color="success" :icon="mdiPencilBox" small @click="handleUpdate(module)"
                            :disabled="disabledButton" />
                        <DeleteModal :id="module.id" :delete="moduleStore.deleteItem" @onDeleted="handleDeleted"
                            @isLoading="disabledButton = $event" />
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
                <BaseButton v-if="currentPage < numPages - 1" label="Last" small @click="currentPage = numPages - 1" />
            </BaseButtons>
            <small>Page
                <input v-model="currentPageData" type="number"
                    class="appearance-none border-blue-500 bottom bg-transparent w-12 text-gray-700 mr-1 ml-1 py-1 px-2 leading-tight focus:outline-none text-center dark:text-gray-300"
                    @keyup.enter="goToPage" :max="numPages" />
                of
                {{ numPages }} </small>
        </BaseLevel>
    </div>
</template>
