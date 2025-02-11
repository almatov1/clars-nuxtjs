import { useUserStore } from "../store/user";

export const PatchDataService = async (email: string, telephone: string, forename: string, surname: string, gender: string) => {
    const result: any = await useApi({
        method: "PATCH",
        path: "/user/data",
        body: JSON.stringify({ email, telephone, forename, surname, gender }),
        useToken: true
    });
    if (result) {
        const user = useUserStore();
        user.updateData(email, telephone, forename, surname, gender);
        push.success("Данные успешно обновлены");
    }
}