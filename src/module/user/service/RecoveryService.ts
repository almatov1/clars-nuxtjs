export const RecoveryService = async (email: string, code?: string, password?: string) => {
    return await useApi({
        method: "PATCH",
        path: "/user/recovery",
        body: JSON.stringify({ email, code, password })
    });
}