import { ReloadCompanyService } from "../../company/service/ReloadCompanyService";

export const DeleteMasterServiceService = async (masterId: number, serviceId: number) => {
    const result: any = await useApi({
        method: "DELETE",
        path: '/master/masterService',
        body: JSON.stringify({ masterId, serviceId }),
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Связка успешно удалена");
    }
}