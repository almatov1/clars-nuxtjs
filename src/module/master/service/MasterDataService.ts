import { ReloadCompanyService } from "../../company/service/ReloadCompanyService";

export const MasterDataService = async (id: number, forename: string, surname: string, profession: string, telephone: string, gender: string) => {
    const result: any = await useApi({
        method: "PATCH",
        path: `/master/${id.toString()}`,
        body: JSON.stringify({ forename, surname, profession, telephone, gender }),
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Специалист успешно обновлен");
    }
}