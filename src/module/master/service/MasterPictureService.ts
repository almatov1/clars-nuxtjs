import { ReloadCompanyService } from "../../company/service/ReloadCompanyService";

export const MasterPictureService = async (id: number, picture: File) => {
    const formData = new FormData();
    formData.append('picture', picture);
    const result: any = await useApi({
        method: "PATCH",
        path: `/master/picture/${id.toString()}`,
        body: formData,
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Фотография успешно обновлена");
    }
}