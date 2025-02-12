import { ReloadCompanyService } from "./ReloadCompanyService";

export const AddIntroService = async (picture: File) => {
    const formData = new FormData();
    formData.append('picture', picture);

    const result: any = await useApi({
        method: "POST",
        path: "/company/intro",
        body: formData,
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Интро успешно добавлена");
    }
}