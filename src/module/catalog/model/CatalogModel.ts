import type { CompanyModel } from "../../company/model/CompanyModel";

export interface CatalogState {
    data: CompanyModel[] | null;
    meta: Meta | null
}

export interface Meta {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: number | null
    next: number | null
}