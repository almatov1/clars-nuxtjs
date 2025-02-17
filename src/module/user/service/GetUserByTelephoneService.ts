export const GetUserByTelephoneService = async (telephone: string) => {
    const queryParams = new URLSearchParams({ telephone }).toString();

    const result: any = await useApi({
        method: "GET",
        path: `/user/telephone?${queryParams}`,
        useToken: true
    });
    return result;
}