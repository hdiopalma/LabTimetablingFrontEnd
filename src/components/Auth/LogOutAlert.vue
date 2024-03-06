<script setup>
import { useAuthService } from '@/services/authService'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import Swal from 'sweetalert2'

const authService = useAuthService()
const router = useRouter()
const logout = async () => {
    Swal.fire({
        title: 'Logout',
        text: 'Are you sure you want to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            // await authService.logout()
            Swal.fire('Logged out', '', 'success')
            router.push('/login')
        } else if (result.isDenied) {
            Swal.fire('Logout cancelled', '', 'info')
        }
    })
}
</script>

<template>
    <div></div>
</template>
