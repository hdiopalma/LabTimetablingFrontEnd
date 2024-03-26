<script setup>
//vue
import { computed, ref, onMounted, defineProps, watch, reactive } from 'vue'

//icons
import { mdiEye, mdiTrashCan, mdiPencilBox } from '@mdi/js'

//store
import { useAssistantStore } from '@/stores/assistant'

//components
import CardBoxModal from '@/components/CardBoxModal.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import DeleteModal from '@/components/Action/DeleteModal.vue'
import CardBoxComponentLoading from '@/components/CardBoxComponentLoading.vue'
import FormInputAssistant from '@/components/Assistant/FormInput.vue'

defineProps({
    checkable: Boolean,
    all: Boolean,
    group: String,
    lab: String
})

const assistantStore = useAssistantStore()

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
    await assistantStore.fetchItems(currentPage.value + 1, perPage.value)
    items.value = assistantStore.items
    itemsCount.value = assistantStore.itemsCount
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
    nim: '',
    semester: '',
    laboratory: '',
    regular_schedule: '',
})

const computedData = computed(() => {
    return dataUpdate
})

const fillData = (lab) => {
    dataUpdate.id = lab.id
    dataUpdate.name = lab.name
    dataUpdate.nim = lab.nim
    dataUpdate.semester = lab.semester.id
    dataUpdate.laboratory = lab.laboratory.id
    dataUpdate.regular_schedule = lab.regular_schedule
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
watch(currentPage, () => {
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
    return Math.min(localStorage.getItem('assistantCount') || perPage.value, perPage.value)
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

</script>

<template>
    <CardBoxModal v-model="isModalActive" title="Update Data Assistant" :hasFooter=false has-cancel>
        <FormInputAssistant :data="computedData" update @dataUpdated="isModalActive = false" />
    </CardBoxModal>

    <CardBoxComponentLoading height="h-12" duration="1.5s" margin="mb-4" v-if="!itemsLoaded" v-for="i in displayCount"
        :key="i" />
    <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
        <thead>
            <tr>
                <th>Name</th>
                <th>NIM</th>
                <th>Assistant</th>
                <th>Semester</th>
                <th />
            </tr>
        </thead>
        <tbody>
            <tr v-for="assistant in items" :key="assistant.id">
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
                        <BaseButton color="info" :icon="mdiEye" small :disabled="disabledButton"
                            :to="`/assistants/${assistant.id}`" />
                        <BaseButton color="success" :icon="mdiPencilBox" small @click="handleUpdate(assistant)"
                            :disabled="disabledButton" />
                        <DeleteModal :id="assistant.id" :delete="assistantStore.deleteItem" @onDeleted="handleDeleted"
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
