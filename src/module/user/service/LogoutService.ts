import { ACCOUNT_ROUTE } from "~/src/core/config/route";
import { useUserStore } from "../store/user";
import { useCompanyStore } from "../../company/store/company";
import { useBookingStore } from "../../booking/store/booking";

export const LogoutService = async ({ request, accessToken }: { request?: boolean; accessToken?: string }) => {
    const user = useUserStore();
    const company = useCompanyStore();
    const booking = useBookingStore();

    if (request && accessToken) await useApi({
        method: "DELETE",
        path: "/auth/logout",
        body: JSON.stringify({ accessToken: accessToken })
    });

    useCookie('accessToken').value = null;
    user.reset();
    company.reset();
    booking.reset();

    navigateTo(ACCOUNT_ROUTE.AUTHENTICATION);
    push.success("Вы успешно вышли из аккаунта")
    return;
}
