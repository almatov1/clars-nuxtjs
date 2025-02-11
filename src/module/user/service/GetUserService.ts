export const GetUserService = async () => {
    const result = await useApi({
        method: "GET",
        path: "/user",
        useToken: true
    });
    return result;
}