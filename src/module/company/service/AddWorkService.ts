import { ReloadCompanyService } from "./ReloadCompanyService";

export const AddWorkService = async (picture: File) => {
    const formData = new FormData();
    formData.append('picture', picture);

    const result: any = await useApi({
        method: "POST",
        path: "/company/work",
        body: formData,
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Работа успешно добавлена");
    }
}