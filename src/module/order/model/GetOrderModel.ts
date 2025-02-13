export interface GetOrderState {
    data: GetOrderModel | null
};

export interface GetOrderModel {
    page?: number
    status?: string
};