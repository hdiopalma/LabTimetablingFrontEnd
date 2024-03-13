
import { useAuthService } from "./authService";
import { useRouter } from "vue-router";

export function useRouteGuard() {
    const authService = useAuthService();
    const router = useRouter();
    function requireAuth(to, from, next) {
        if (to.meta.requiresAuth && !authService.isAuthenticated()) {
        next({ name: "login" });
        } else {
        next();
        }
    }
    
    return {
        requireAuth,
    };
}