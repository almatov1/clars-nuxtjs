import type { GetOrderModel } from "../../order/model/GetOrderModel";

export const GetCompanyOrderService = async (params: GetOrderModel) => {
    const queryParams = new URLSearchParams({
        page: (params.page ?? '').toString(),
        status: params.status ?? ''
    }).toString();

    const result: any = await useApi({
        method: "GET",
        path: `/order/company?${queryParams}`,
        useToken: true
    });

    return result;
}