export const GetCompanyService = async (id: number) => {
    const result: any = await useApi({
        method: "GET",
        path: `/company/${id.toString()}`
    });
    return result;
}