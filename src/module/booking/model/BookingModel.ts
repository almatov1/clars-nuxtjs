import type { CompanyModel } from "../../company/model/CompanyModel"

export interface BookingState {
    data: BookingModel | null
};

export interface BookingModel {
    company?: CompanyModel
    serviceId?: number
    masterId?: number
    date?: Date
    times?: string[]
    time?: string
    note?: string
};