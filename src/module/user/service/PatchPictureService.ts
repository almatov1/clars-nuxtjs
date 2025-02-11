import { useUserStore } from "../store/user";

export const PatchPictureService = async (picture: File) => {
    const formData = new FormData();
    formData.append('picture', picture);

    const result: any = await useApi({
        method: "PATCH",
        path: "/user/picture",
        body: formData,
        useToken: true
    });
    if (result) {
        const user = useUserStore();
        user.updatePicture(result.picture);
        push.success("Фотография успешно обновлена");
    }
}