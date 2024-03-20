<script setup>

//vue
import { reactive, ref, computed, onMounted } from 'vue'

//icons
import { mdiBallotOutline, mdiAccount, mdiCalendar, mdiRefresh, mdiAccountBox } from '@mdi/js'

//components
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import FormInputLab from '@/components/Lab/FormInput.vue'

//Lab Store
import { useLabStore } from '@/stores/lab'

//Router
import { useRouter } from 'vue-router'

//Variable
const router = useRouter()


const goToBack = () => {
    router.go(-1)
}

</script>

<template>
        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Lab Form" main>
                <BaseButton @click="goToBack" target="_blank" :icon="mdiRefresh" label="Go back" color="contrast"
                    rounded-full small />
            </SectionTitleLineWithButton>

            <FormInputLab />
            
        </SectionMain>
</template>
