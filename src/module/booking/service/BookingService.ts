export const BookingService = async (companyId: number, serviceId: number, masterId: number, date: string, time: string, note?: string) => {
    const result: any = await useApi({
        method: "POST",
        path: "/order",
        body: JSON.stringify({ companyId, serviceId, masterId, date, time, note }),
        useToken: true
    });
    return result;
}