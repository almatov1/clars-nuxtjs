export interface StatisticsState {
    data: StatisticsModel | null;
}

export interface StatisticsModel {
    profit: number
    loss: number
    clients: number
    chart: ChartModel[]
}

export interface ChartModel {
    month: number
    count: number
}