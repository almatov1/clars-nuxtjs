export const AddCertificateService = async (telephone: string, procent: number) => {
    const result: any = await useApi({
        method: "POST",
        path: "/certificate",
        body: JSON.stringify({ telephone, procent }),
        useToken: true
    });
    return result;
}
