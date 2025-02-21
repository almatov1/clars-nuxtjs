import { ACCOUNT_ROUTE } from "~/src/core/config/route";
import { useUserStore } from "../store/user";
import { useCompanyStore } from "../../company/store/company";
import { useBookingStore } from "../../booking/store/booking";
import { useOrderStore } from "../../order/store/order";
import { useOrderSearchStore } from "../../order/store/orderSearch";
import { useCertificateStore } from "../../certificate/store/certificate";
import { useCompanyOrderStore } from "../../companyOrder/store/companyOrder";
import { useCompanyOrderSearchStore } from "../../companyOrder/store/companyOrderSearch";

export const LogoutService = async ({ request, accessToken }: { request?: boolean; accessToken?: string }) => {
    const user = useUserStore();
    const company = useCompanyStore();
    const booking = useBookingStore();
    const order = useOrderStore();
    const orderSearch = useOrderSearchStore();
    const certificate = useCertificateStore();
    const companyOrder = useCompanyOrderStore();
    const companyOrderSearch = useCompanyOrderSearchStore();

    if (request && accessToken) await useApi({
        method: "DELETE",
        path: "/auth/logout",
        body: JSON.stringify({ accessToken: accessToken })
    });

    useCookie('accessToken').value = null;
    user.reset();
    company.reset();
    booking.reset();
    order.reset();
    orderSearch.reset();
    certificate.reset();
    companyOrder.reset();
    companyOrderSearch.reset();

    navigateTo(ACCOUNT_ROUTE.AUTHENTICATION);
    push.success("Вы успешно вышли из аккаунта")
    return;
}
