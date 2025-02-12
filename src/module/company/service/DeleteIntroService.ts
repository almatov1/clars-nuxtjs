import { ReloadCompanyService } from "./ReloadCompanyService";

export const DeleteIntroService = async (id: number) => {
    const result: any = await useApi({
        method: "DELETE",
        path: `/company/intro/${id.toString()}`,
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Интро успешно удален");
    }
}