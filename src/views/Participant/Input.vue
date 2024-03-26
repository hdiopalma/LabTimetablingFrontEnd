<script setup>
import { mdiBallotOutline, mdiRefresh } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import FormInputParticipant from '@/components/Participant/FormInput.vue'

import { useRouter } from 'vue-router'

const router = useRouter()
const goToBack = () => {
    router.go(-1)
}

</script>
<template>
        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Forms Participant" main>
                <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast"
                    rounded-full small />
            </SectionTitleLineWithButton>

            <FormInputParticipant />
            
        </SectionMain>
</template>
