import { ReloadCompanyService } from "../../company/service/ReloadCompanyService";

export const DeleteMasterService = async (id: number) => {
    const result: any = await useApi({
        method: "DELETE",
        path: `/master/${id.toString()}`,
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Специалист успешно удален");
    }
}