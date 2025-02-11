import type { UserModel } from "~/src/module/user/model/UserModel";
import { GetUserService } from "~/src/module/user/service/GetUserService";
import { LogoutService } from "~/src/module/user/service/LogoutService";
import { useUserStore } from "~/src/module/user/store/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const accessTokenCookie = useCookie('accessToken');
    const user = useUserStore();

    if (accessTokenCookie.value && !user.data) {
        const result = await GetUserService() as any;
        if (!result) {
            LogoutService({});
            return true;
        }

        user.set(result.user as UserModel);
    }
    return true;
})
