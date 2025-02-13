export const GetTimesService = async (companyId: number, masterId: number, date: Date) => {
    const queryParams = new URLSearchParams({
        companyId: companyId.toString(),
        masterId: masterId.toString(),
        date: date.toISOString()
    }).toString();

    const result: any = await useApi({
        method: "GET",
        path: `/order/times?${queryParams}`
    });
    return result;
}