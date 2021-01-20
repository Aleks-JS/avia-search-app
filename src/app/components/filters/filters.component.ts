import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { HttpService } from './../../services/http.service';
import { priceSort, transferFilter } from './../../interfaces/filters';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

const PRICE_SORT_ITEMS = [
  { value: 'scending', display: 'По возрастанию', attribute: priceSort.min },
  { value: 'descending', display: 'По убыванию', attribute: priceSort.max },
  {
    value: 'duration',
    display: 'По времени в пути',
    attribute: priceSort.duration,
  },
];

const TRANSPLANTS_FILTER_ITEMS = [
  {
    value: 'one-segment',
    display: 'Без пересадок',
    attribute: transferFilter.withoutTransfers,
  },
  {
    value: 'two-segment',
    display: 'Одна пересадка',
    attribute: transferFilter.oneTransplant,
  },
];

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  priceSortItems = PRICE_SORT_ITEMS;
  transplantsFilterItems = TRANSPLANTS_FILTER_ITEMS;

  prices$ = this.httpService.getPrice();
  carriers$ = this.httpService.getCarriers();

  filtersForm = this.fb.group({
    sort: [this.priceSortItems[0].attribute],
    transferFilter: this.transplantsFilterItems,
    minCost: '',
    maxCost: '',
  });

  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getData().subscribe((e) => console.log(e));
    this.prices$.subscribe((cost: object) => {
      this.filtersForm.patchValue({
        minCost: cost['min'],
        maxCost: cost['max'],
      });
    });
    this.carriers$.subscribe((e) => console.log(e));
  }

  ngOnDestroy(): void {}
}
