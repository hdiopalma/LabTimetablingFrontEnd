<script setup>
import { computed, ref, onMounted, defineProps, watch } from 'vue'
import { useParticipantStore } from '@/stores/participant'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'

import CardBoxComponentLoading from '@/components/CardBoxComponentLoading.vue'

defineProps({
    checkable: Boolean,
    all: Boolean,
    group: String,
    semester: String
})

const participantStore = useParticipantStore()

const items = ref([])
const visibleItems = ref([])
const itemsCount = ref(0)
const itemsLoaded = ref(false)
onMounted(async () => {
    await participantStore.fetchParticipants(currentPage.value + 1, perPage.value)
    items.value = participantStore.items
    itemsCount.value = participantStore.itemsCount
    await new Promise((resolve) => setTimeout(resolve, 1000))
    itemsLoaded.value = true
})
const refresh = async () => {
    await participantStore.fetchParticipants(currentPage.value + 1, perPage.value)
    items.value = participantStore.items
    itemsCount.value = participantStore.itemsCount
    itemsLoaded.value = true
}

//Modal
const isModalActive = ref(false)
const isModalDangerActive = ref(false)

//Pagination
const perPage = ref(10)
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
        if ((i >= currentPage.value - margin && i <= currentPage.value + margin)) {
            pagesList.push(i)
        }
    }
    return pagesList
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

//Checkbox
const checkedRows = ref([])
const remove = (arr, cb) => {
    const newArr = []
    arr.forEach((item) => {
        if (!cb(item)) {
            newArr.push(item)
        }
    })
    return newArr
}
const checked = (isChecked, participant) => {
    if (isChecked) {
        checkedRows.value.push(participant)
    } else {
        checkedRows.value = remove(checkedRows.value, (row) => participant.id === participant.id)
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
                <th>Group</th>
                <th>Semester</th>
                <th />
            </tr>
        </thead>
        <tbody v-if="!itemsLoaded">
            <tr v-for="n in perPage" :key="n">
                <td colspan="6">
                    <CardBoxComponentLoading padding="py-4 pt-2" height="h-8" />
                </td>
            </tr>
        </tbody>
        <tbody class="divide-gray-200 dark:divide-slate-800" v-else>
                <tr v-for="(participant, index) in items" :key="participant.id"
                    class="hover:bg-gray-100 dark:hover:bg-slate-800">
                    <td data-label="Name">
                        {{ participant.name }}
                    </td>
                    <td data-label="NIM">
                        {{ participant.nim }}
                    </td>
                    <td data-label="Group">
                        {{ participant.groups.map(group => group.name).join(', ') }}
                    </td>
                    <td data-label="Semester">
                        {{ participant.semester.name }}
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

<style>
.fade-enter-active, .fade-leave-active {
    transition: all 0.1s ease;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
</style>