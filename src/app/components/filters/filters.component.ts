import { DataService } from './../../services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  filter,
  map,
  max,
  min,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { HttpService } from './../../services/http.service';
import { Filters, priceSort, transferFilter } from './../../interfaces/filters';
import { BehaviorSubject, Subject, Observable, of, from } from 'rxjs';

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
  providers: [HttpService, DataService],
})
export class FiltersComponent implements OnInit, OnDestroy {
  priceSortItems = PRICE_SORT_ITEMS;
  transplantsFilterItems = TRANSPLANTS_FILTER_ITEMS;

  private refresh$ = new Subject();
  private destroy$ = new Subject();

  prices$ = this.refresh$.pipe(
    startWith(true),
    switchMap(() => this.dataService.getPrice()),
    shareReplay(1)
  );

  carriers$ = this.refresh$.pipe(
    startWith(true),
    switchMap(() => this.dataService.getCarriers()),
    shareReplay(1)
  );

  filtersForm: FormGroup = this.fb.group({
    sort: [this.priceSortItems[0].attribute],
    transferFilter: [null],
    minCost: [null],
    maxCost: [null],
    airlines: [null],
  });

  resultValueFilter$ = this.filtersForm.valueChanges.pipe(
    startWith({
      sort: null,
      transferFilter: null,
      minCost: null,
      maxCost: null,
      airlines: null,
    })
  );

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.prices$.pipe(takeUntil(this.destroy$)).subscribe((cost) => {
      this.filtersForm.patchValue({
        minCost: cost['min'],
        maxCost: cost['max'],
      });
    });
    // this.dataService
    //   .getPrice()
    //   .pipe(tap(console.log), max(), tap(console.log))
    //   .subscribe((x) => console.log(x));
    // this.prices$.subscribe((e) => console.log(e));
    // this.httpService.getData().subscribe((e) => console.log(e));
    // this.prices$.subscribe((e) => console.log(e));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
