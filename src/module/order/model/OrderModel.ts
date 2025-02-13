import type { CompanyModel, MasterModel, ServiceModel } from "../../company/model/CompanyModel";
import type { UserModel } from "../../user/model/UserModel";

export interface OrderState {
    data: OrderModel[] | null;
    meta: Meta | null
}

export interface OrderModel {
    id: number
    clientId: number
    companyId: number
    serviceId: number
    masterId: number
    price: number
    note?: string
    date: Date
    status: string
    createdAt: Date
    client: UserModel
    company: CompanyModel
    service: ServiceModel
    master: MasterModel
}

export interface Meta {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: number | null
    next: number | null
}