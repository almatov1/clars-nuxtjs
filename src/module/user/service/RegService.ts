import { ACCOUNT_ROUTE } from "~/src/core/config/route";

export const RegService = async (email: string, forename: string, password: string) => {
    const result: any = await useApi({
        method: "POST",
        path: "/user",
        body: JSON.stringify({ email, forename, password })
    });
    if (result) {
        push.success("Ваш аккаунт успешно зарегистрирован! Войдите в ваш аккаунт")
        navigateTo(ACCOUNT_ROUTE.AUTHENTICATION);
    }
}