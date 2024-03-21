<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiRefresh, mdiAccountBox } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

import FormInputAssistant from '@/components/Assistant/FormInput.vue'

//Lab Store
import { useLabStore } from '@/stores/lab'

import { useRouter } from 'vue-router'

const labStore = useLabStore()
const router = useRouter()

const goToBack = () => {
    // router.push('/assistants')
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
            <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Forms Assistant" main>
                <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast"
                    rounded-full small />
            </SectionTitleLineWithButton>

            <FormInputAssistant />
            
        </SectionMain>
</template>
