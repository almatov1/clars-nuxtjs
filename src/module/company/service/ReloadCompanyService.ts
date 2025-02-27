import type { CertificateModel } from "../../certificate/model/CertificateModel";
import { useCertificateStore } from "../../certificate/store/certificate";
import type { UserModel } from "../../user/model/UserModel";
import { GetUserService } from "../../user/service/GetUserService";
import { useUserStore } from "../../user/store/user";
import type { CompanyModel } from "../model/CompanyModel";
import type { StatisticsModel } from "../model/StatisticsModel";
import { useCompanyStore } from "../store/company";
import { useStatisticsStore } from "../store/statistics";

export const ReloadCompanyService = async () => {
    const user = useUserStore();
    const company = useCompanyStore();
    const certificate = useCertificateStore();
    const statistics = useStatisticsStore();

    const result = await GetUserService() as any;
    if (result) {
        user.set(result.user as UserModel);
        company.set(result.company as CompanyModel);
        statistics.set(result.statistics as StatisticsModel | null);
        certificate.set(result.certificate as CertificateModel[]);
    }
}