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

import ShootingStar from '@/components/Misc/ShootingStar.vue'
import Logo from '@/components/Misc/Logo.vue'

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
  <SectionFullScreen v-slot="{ cardClass }" bg="dark">


    <!-- Two collumns layout. -->

    <div class="grid grid-cols-1 lg:grid-cols-2 h-full w-full relative">
      <!-- Shooting Star Background -->

      <div class="flex items-center justify-center">
        <CardBox :class="cardClass" is-form @submit.prevent="submit" bg-color="bg-slate-900/20 dark:bg-slate-900/70"
          rounded="rounded-xl" class="w-full max-w-lg transform transition-transform duration-300 hover:scale-[1.02]">

          <!-- Insert logo -->
          <div class="mb-6 text-center">
          <Logo class="w-24 h-24 mx-auto mb-4" />
            <h1 class="text-2xl font-bold text-white dark:text-slate-300 mb-2">
              Login</h1>
            <p class="text-gray-600 dark:text-slate-400">Please enter your credentials</p>
          </div>

          <FormField label="Username" help="Please enter your username" label-color="text-white dark:text-slate-300">
            <FormControl v-model="form.username" :icon="mdiAccount" name="username" autocomplete="username" />
          </FormField>

          <FormField label="Password" help="Please enter your password" label-color="text-white dark:text-slate-300">
            <FormControl v-model="form.password" :icon="mdiAsterisk" type="password" name="password"
              autocomplete="current-password" />
          </FormField>

          <FormCheckRadio v-model="form.remember" name="remember" label="Remember"
            label-color="text-white dark:text-slate-300" :input-value="true" />

          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="danger" label="Login" />
              <BaseButton to="/dashboard" color="danger" outline label="Back" />
            </BaseButtons>
          </template>
        </CardBox>
      </div>

      <div class="hidden lg:block relative overflow-hidden">
        <ShootingStar class="absolute inset-0 w-full h-full scale-125" />
        <!-- Tittle -->
        <div class="absolute inset-0 flex items-center justify-center">
          <h1 class="text-8xl font-bold text-white dark:text-slate-300 text-regular text-right top-0">
            HYBRID <br> META <br>  HEURISTIC
            <hr class="mt-8 border-t-2 border-white dark:border-slate-300" />
            <span class="text-4xl mt-4 block">
              SCHEDULING SYSTEM
            </span>
          </h1>
          
          </div>
      </div>

      

    </div>

  </SectionFullScreen>
</template>
