import { COMPANY_ROUTE } from "~/src/core/config/route";
import { ReloadCompanyService } from "./ReloadCompanyService";

export const CreateCompanyService = async (openingTime: string, closingTime: string, category: string, name: string, description: string, region: string, address: string, picture: File) => {
    const formData = new FormData();
    formData.append('picture', picture);
    formData.append('openingTime', openingTime);
    formData.append('closingTime', closingTime);
    formData.append('category', category);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('region', region);
    formData.append('address', address);

    const result: any = await useApi({
        method: "POST",
        path: "/company",
        body: formData,
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        navigateTo(COMPANY_ROUTE.CABINET);
        push.success("Ваша компания успешно создана");
    }
}