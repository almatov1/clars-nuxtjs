import { ReloadCompanyService } from "./ReloadCompanyService";

export const CompanyInfoService = async (openingTime: string, closingTime: string, category: string, name: string, description: string, region: string, address: string) => {
    const result: any = await useApi({
        method: "PATCH",
        path: "/company/info",
        body: JSON.stringify({ openingTime, closingTime, category, name, description, region, address }),
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Данные успешно обновлены");
    }
}