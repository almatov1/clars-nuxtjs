export const AddMasterServiceService = async (masterId: number, serviceId: number) => {
    await useApi({
        method: "POST",
        path: '/master/masterService',
        body: JSON.stringify({ masterId, serviceId }),
        useToken: true
    });
}