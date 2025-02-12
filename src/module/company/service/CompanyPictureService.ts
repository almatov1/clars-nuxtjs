import { ReloadCompanyService } from "./ReloadCompanyService";

export const CompanyPictureService = async (picture: File) => {
    const formData = new FormData();
    formData.append('picture', picture);

    const result: any = await useApi({
        method: "PATCH",
        path: "/company/picture",
        body: formData,
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Фотография успешно обновлена");
    }
}