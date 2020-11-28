export enum priceSort { max = 'max', min = 'min', duration = 'duration' }

export interface Filters {
    priceSort: priceSort,
    transferFilter: string,
    minCost: number,
    maxCost: number,
    airlines: string
}
