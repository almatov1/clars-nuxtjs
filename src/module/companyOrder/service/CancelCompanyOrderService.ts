import { useCompanyOrderStore } from "../store/companyOrder";

export const CancelCompanyOrderService = async (id: number) => {
    const result: any = await useApi({
        method: "PATCH",
        path: `/order/${id.toString()}`,
        useToken: true
    });
    if (result) {
        const order = useCompanyOrderStore();
        order.cancelOrder(id);
        push.success("Запись успешно отменен");
    }
    return result;
}
