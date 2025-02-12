export interface GetCatalogState {
    data: GetCatalogModel | null
};

export interface GetCatalogModel {
    page?: number
    category?: string
    region?: string
    orderBy?: string
};