import { GetUserService } from "../../user/service/GetUserService";
import type { CompanyModel } from "../model/CompanyModel";
import { useCompanyStore } from "../store/company";

export const ReloadCompanyService = async () => {
    const company = useCompanyStore();

    const result = await GetUserService() as any;
    if (result) company.set(result.company as CompanyModel);
}