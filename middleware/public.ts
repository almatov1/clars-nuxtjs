import { ACCOUNT_ROUTE } from "~/src/core/config/route";

export default defineNuxtRouteMiddleware((to, from) => {
    const accessTokenCookie = useCookie('accessToken');
    if (accessTokenCookie.value) return navigateTo(ACCOUNT_ROUTE.PROFILE);
    return true;
})