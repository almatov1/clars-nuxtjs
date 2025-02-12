import type { GetCatalogModel } from "../model/GetCatalogModel";

export const GetCatalogService = async (params: GetCatalogModel) => {
    const queryParams = new URLSearchParams({
        page: (params.page ?? '').toString(),
        category: params.category ?? '',
        region: params.region ?? '',
        orderBy: params.orderBy ?? ''
    }).toString();

    const result: any = await useApi({
        method: "GET",
        path: `/company?${queryParams}`
    });

    return result;
}