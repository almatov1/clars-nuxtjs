import { ReloadCompanyService } from "../../company/service/ReloadCompanyService";

export const AddServiceService = async (name: string, price: number) => {
    const result: any = await useApi({
        method: "POST",
        path: "/service",
        body: JSON.stringify({ name, price }),
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Сервис успешно добавлен");
    }
}