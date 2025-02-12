import { ReloadCompanyService } from "./ReloadCompanyService";

export const CompanyContactService = async (telephone: string, email: string, whatsapp: string, instagram: string) => {
    const result: any = await useApi({
        method: "PATCH",
        path: "/company/contact",
        body: JSON.stringify({ telephone, email, whatsapp, instagram }),
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Конакты успешно обновлены");
    }
}