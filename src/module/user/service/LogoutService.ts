import { ACCOUNT_ROUTE } from "~/src/core/config/route";
import { useUserStore } from "../store/user";

export const LogoutService = async ({ request, accessToken }: { request?: boolean; accessToken?: string }) => {
    const user = useUserStore();

    if (request && accessToken) await useApi({
        method: "DELETE",
        path: "/auth/logout",
        body: JSON.stringify({ accessToken: accessToken })
    });

    useCookie('accessToken').value = null;
    user.reset();

    navigateTo(ACCOUNT_ROUTE.AUTHENTICATION);
    return;
}
