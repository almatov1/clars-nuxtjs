import type { CompanyModel } from "~/src/module/company/model/CompanyModel";
import { useCompanyStore } from "~/src/module/company/store/company";
import type { UserModel } from "~/src/module/user/model/UserModel";
import { GetUserService } from "~/src/module/user/service/GetUserService";
import { LogoutService } from "~/src/module/user/service/LogoutService";
import { useUserStore } from "~/src/module/user/store/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const accessTokenCookie = useCookie('accessToken');
    const user = useUserStore();
    const company = useCompanyStore();

    if (accessTokenCookie.value && !user.data) {
        const result = await GetUserService() as any;
        if (!result) {
            LogoutService({});
            return true;
        }

        user.set(result.user as UserModel);
        company.set(result.company as CompanyModel);
    }
    return true;
})
