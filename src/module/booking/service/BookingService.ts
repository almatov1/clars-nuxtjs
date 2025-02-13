export const BookingService = async (companyId: number, serviceId: number, masterId: number, date: Date, time: string, note?: string) => {
    const convertedDate = date.toISOString();
    const result: any = await useApi({
        method: "POST",
        path: "/order",
        body: JSON.stringify({ companyId, serviceId, masterId, date: convertedDate, time, note }),
        useToken: true
    });
    return result;
}
