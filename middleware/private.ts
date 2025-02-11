import { ACCOUNT_ROUTE } from "~/src/core/config/route";
import { useUserStore } from "~/src/module/user/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
    const accessTokenCookie = useCookie('accessToken');
    const user = useUserStore();
    if (!accessTokenCookie.value || !user.data) return navigateTo(ACCOUNT_ROUTE.AUTHENTICATION, { external: true });
});