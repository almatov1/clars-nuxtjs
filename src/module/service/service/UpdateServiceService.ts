import { ReloadCompanyService } from "../../company/service/ReloadCompanyService";

export const UpdateServiceService = async (id: number, name: string, price: number) => {
    const result: any = await useApi({
        method: "PATCH",
        path: `/service/${id.toString()}`,
        body: JSON.stringify({ name, price }),
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Сервис успешно обновлен");
    }
}