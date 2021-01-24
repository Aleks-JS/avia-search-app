export enum priceSort {
  max = 'max',
  min = 'min',
  duration = 'duration',
}
export enum transferFilterItemValue {
  withoutTransfers = 'withoutTransfers',
  oneTransplant = 'oneTransplant',
}

export enum transferFilterItemDisplay {
  withoutTransfers = 'Без пересадок',
  oneTransplant = 'Одна пересадка',
}

export enum airlinesFilter {
  carrier = 'carrier',
  carrierUid = 'carrierUid',
}

export interface transferFilter {
  value: transferFilterItemValue;
  display: transferFilterItemDisplay;
  selected: boolean;
}

export interface Filters {
  priceSort: priceSort;
  transferFilter: transferFilter;
  minCost: number;
  maxCost: number;
  airlines: airlinesFilter;
}
