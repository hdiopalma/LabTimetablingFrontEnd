<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiCalendar, mdiRefresh, mdiAccountBox } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import NotificationBarInCard from '@/components/NotificationBarInCard.vue'

import ModuleSelectOption from '@/components/Module/SelectOption.vue'
import FormInputChapter from '@/components/Chapter/FormInput.vue'

//Lab Store
import { useLabStore } from '@/stores/lab'

import { useRouter } from 'vue-router'



const labStore = useLabStore()
const router = useRouter()

const goToBack = () => {
    //router.push('/participants')
    router.go(-1)
}

const labsItems = ref([])
onMounted(async () => {
    await labStore.fetchItems()
    labsItems.value = labStore.items.map(item => ({ id: item.id, label: item.name }))
})

</script>

<template>
        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Chapter Form" main>
                <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast"
                    rounded-full small />
            </SectionTitleLineWithButton>
            
            <FormInputChapter />

        </SectionMain>
</template>
