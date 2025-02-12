import { ReloadCompanyService } from "./ReloadCompanyService";

export const DeleteWorkService = async (id: number) => {
    const result: any = await useApi({
        method: "DELETE",
        path: `/company/work/${id.toString()}`,
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Работа успешно удалена");
    }
}