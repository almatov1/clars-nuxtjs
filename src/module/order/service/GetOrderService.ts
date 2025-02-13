import type { GetOrderModel } from "../model/GetOrderModel";

export const GetOrderService = async (params: GetOrderModel) => {
    const queryParams = new URLSearchParams({
        page: (params.page ?? '').toString(),
        status: params.status ?? ''
    }).toString();

    const result: any = await useApi({
        method: "GET",
        path: `/order?${queryParams}`,
        useToken: true
    });

    return result;
}