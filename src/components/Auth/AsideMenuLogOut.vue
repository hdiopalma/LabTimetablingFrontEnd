<script setup>
import { useAuthService } from '@/services/authService'
import { mdiLogout, mdiClose } from '@mdi/js'
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import { useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'
import Swal from 'sweetalert2'

const authService = useAuthService()
const router = useRouter()
const handleLogout = async () => {
    Swal.fire({
        title: 'Logout',
        text: 'Are you sure you want to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Logging out...',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading(),
                    logout()
                }
            })
        } else if (result.isDenied) {
            Swal.fire('Logout cancelled', '', 'info')
        }
    })
}

const handleLogoutSuccess = () => {
    Swal.fire({
        icon: 'success',
        title: 'Goodbye!',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500
    })
}

const logout = async () => {
    try {
        await authService.logout()
        handleLogoutSuccess()
        router.push('/login')
    } catch (error) {
        handleLoginError(error)
    }
}

const logoutItem = computed(() => ({
    label: 'Logout',
    icon: mdiLogout,
    color: 'danger',
    isLogout: true
}))

</script>

<template>
    <AsideMenuItem :item="logoutItem" @menu-click="handleLogout" />
</template>
