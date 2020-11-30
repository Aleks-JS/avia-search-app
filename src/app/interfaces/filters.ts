export enum priceSort { max = 'max', min = 'min', duration = 'duration' }
export enum transferFilter { withoutTransfers = 'withoutTransfers', oneTransplant = 'oneTransplant' }

export interface Filters {
    priceSort: priceSort,
    transferFilter: transferFilter,
    minCost: number,
    maxCost: number,
    airlines: string
}
