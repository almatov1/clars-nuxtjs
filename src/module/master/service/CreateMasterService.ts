import { ReloadCompanyService } from "../../company/service/ReloadCompanyService";

export const CreateMasterService = async (forename: string, surname: string, profession: string, telephone: string, gender: string, picture: File) => {
    const formData = new FormData();
    formData.append('picture', picture);
    formData.append('forename', forename);
    formData.append('surname', surname);
    formData.append('profession', profession);
    formData.append('telephone', telephone);
    formData.append('gender', gender);

    const result: any = await useApi({
        method: "POST",
        path: "/master",
        body: formData,
        useToken: true
    });
    if (result) {
        await ReloadCompanyService();
        push.success("Специалист успешно создан");
    }
}