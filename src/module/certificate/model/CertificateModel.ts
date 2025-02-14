import type { CompanyModel } from "../../company/model/CompanyModel"

export interface CertificateState {
    data: CertificateModel[] | null
};

export interface CertificateModel {
    id: number
    clientId: number
    companyId: number
    procent: number
    createdAt: Date
    company: CompanyModel
};