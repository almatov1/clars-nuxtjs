export const BookingService = async ({ companyId, serviceId, masterId, date, time, note, certificateId }: { companyId: number, serviceId: number, masterId: number, date: Date, time: string, note?: string, certificateId?: number }) => {
    const convertedDate = date.toISOString();
    const result: any = await useApi({
        method: "POST",
        path: "/order",
        body: JSON.stringify({ companyId, serviceId, masterId, date: convertedDate, time, note, certificateId }),
        useToken: true
    });
    return result;
}
