<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthService } from '@/services/authService'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'

import Swal from 'sweetalert2'

const form = reactive({
  username: 'john.doe',
  password: 'highly-secure-password-fYjUw-',
  remember: true
})

const authService = useAuthService()
const login = async () => {
  try {
    if (await authService.login(form)) {
      handleLoginSuccess()
      router.push('/dashboard')
    } else {
      handleLoginError(new Error('Invalid credentials'))
    }
  } catch (error) {
    handleLoginError(error)
  }
}

const handleLoginError = (error) => {
  Swal.fire({
    icon: 'error',
    title: 'Failed To Login!',
    text: error.message
  })
}

const handleLoginSuccess = () => {
  Swal.fire({
    icon: 'success',
    title: 'Welcome!',
    text: 'You have successfully logged in'
  })
}

const handleLogin = async () => {
  Swal.fire({
    title: 'Logging in...',
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading(),
      login()
    }
  })
}

const router = useRouter()

const submit = () => {
  handleLogin()
}
</script>

<template>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.username"
            :icon="mdiAccount"
            name="username"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
</template>