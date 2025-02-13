import { useOrderStore } from "../store/order";

export const CancelOrderService = async (id: number) => {
    const result: any = await useApi({
        method: "PATCH",
        path: `/order/${id.toString()}`,
        useToken: true
    });
    if (result) {
        const order = useOrderStore();
        order.cancelOrder(id);
        push.success("Запись успешно отменен");
    }
    return result;
}
