<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiCheckDecagram } from '@mdi/js'
import BaseLevel from '@/components/BaseLevel.vue'
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import PillTag from '@/components/PillTag.vue'

const mainStore = useMainStore()

const userName = computed(() => mainStore.userName)
const userEmail = computed(() => mainStore.userEmail)
const lastLogin = computed(() => {
  const lastLoginDate = mainStore.userLastLogin
  if (lastLoginDate) {
    // return new Date(lastLoginDate).toLocaleString()
    // format is (time) minute/hours/days ago, if more than 30 days, return date
    const now = new Date()
    const diff = now - new Date(lastLoginDate)
    const diffInMinutes = Math.floor(diff / (1000 * 60))
    const diffInHours = Math.floor(diff / (1000 * 60 * 60))
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24))
    const diffInMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
    const diffInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else if (diffInDays < 30) {
      return `${diffInDays} days ago`
    } else if (diffInMonths < 12) {
      return `${diffInMonths} months ago`
    } else if (diffInYears > 1) {
      return new Date(lastLoginDate).toLocaleDateString()
    }
  }
  return 'Never'
})


const userSwitchVal = ref(false)

//last login


</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatarCurrentUser class="lg:mx-12 h-64" frame-shape="3xl" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="flex justify-center md:block">
          <FormCheckRadio
            v-model="userSwitchVal"
            name="notifications-switch"
            type="switch"
            label="Notifications"
            :input-value="true"
          />
        </div>
        <h1 class="text-2xl">
          Hello, <b>{{ userName }}</b
          >!
        </h1>
        <p>Last login <b>
          {{ lastLogin }}
        </b> from <b>127.0.0.1</b></p>
        <div class="flex justify-center md:block">
          <!-- <PillTag label="Verified" color="info" :icon="mdiCheckDecagram" /> -->
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
