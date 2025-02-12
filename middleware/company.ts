import { ACCOUNT_ROUTE, COMPANY_ROUTE } from "~/src/core/config/route";
import { useCompanyStore } from "~/src/module/company/store/company";

export default defineNuxtRouteMiddleware((to, from) => {
    const company = useCompanyStore();
    if (!company.data) return navigateTo(COMPANY_ROUTE.CREATE, { external: true });
});