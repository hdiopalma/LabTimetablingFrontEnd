<script setup>

//vue
import { reactive, ref, computed, onMounted } from 'vue'

//icons
import { mdiBallotOutline, mdiAccount, mdiRefresh, mdiAccountBox, mdiFolderAccountOutline, mdiAccountMultiple } from '@mdi/js'

//components
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import FormInputParticipant from '@/components/Participant/FormInput.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'

//Router
import { useRouter } from 'vue-router'

//Variable
const router = useRouter()

//Store
import { useParticipantStore } from '@/stores/participant'
const participantStore = useParticipantStore()

//Props
const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
})

//Data
const data = ref({
    id: '',
    name: '',
    nim: '',
    semester: '',
    group: '',
    regular_schedule: '',
})

//Page Data
const pageData = ref({
    title: 'Participant',
})

//Load
const load = async () => {
    try {
        console.log(props.id)
        const response = await participantStore.fetchItem(props.id)
        data.value.id = response.id
        data.value.name = response.name
        data.value.nim = response.nim
        data.value.semester = response.semester.id
        data.value.group = response.group
        data.value.regular_schedule = response.regular_schedule
        disabled.value = false
    } catch (error) {
        console.log(error)
        router.push({ name: 'participants' })
    }
}

onMounted(async () => {
    await load()
})

const disabled = ref(true)

const goToBack = () => {
    router.go(-1)
}

</script>

<template>
    <div>
        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Lab Form" main>
                <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast"
                    rounded-full small />
            </SectionTitleLineWithButton>

            <FormInputParticipant :data="data" :disabled="disabled" :update="true" />

        </SectionMain>

    </div>
</template>