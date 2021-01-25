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

export interface airlinesFilter {
  value: string;
  display: string;
  selected: boolean;
}

export interface transferFilter {
  value: transferFilterItemValue;
  display: transferFilterItemDisplay;
  selected: boolean;
}

export interface Filters {
  sort: priceSort;
  transferFilter: transferFilter;
  minCost: number;
  maxCost: number;
  airlines: airlinesFilter;
}
