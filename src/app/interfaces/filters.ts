export enum priceSort {
  max = 'max',
  min = 'min',
  duration = 'duration',
}
export enum transferFilter {
  withoutTransfers = 'withoutTransfers',
  oneTransplant = 'oneTransplant',
}
export enum airlinesFilter {
  carrier = 'carrier',
  carrierUid = 'carrierUid',
}

export interface Filters {
  priceSort: priceSort;
  transferFilter: transferFilter;
  minCost: number;
  maxCost: number;
  airlines: airlinesFilter;
}
