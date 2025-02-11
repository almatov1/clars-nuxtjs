import { ACCOUNT_ROUTE } from "~/src/core/config/route";

export const AuthService = async (email: string, password: string) => {
    const result: any = await useApi({
        method: "POST",
        path: "/auth/login",
        body: JSON.stringify({ email, password })
    });

    if (result) {
        const accessTokenCookie = useCookie('accessToken', { maxAge: 7776000, sameSite: 'lax' });
        accessTokenCookie.value = result.accessToken;
        navigateTo(ACCOUNT_ROUTE.PROFILE);
    }
}