import { ReloadCompanyService } from "../../company/service/ReloadCompanyService";

export const DeleteServiceService = async (id: number) => {
    const result: any = await useApi({
        method: "DELETE",
        path: `/service/${id.toString()}`,
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Сервис успешно удален");
    }
}