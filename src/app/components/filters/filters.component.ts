import { DataService } from './../../services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
import {
  Filters,
  priceSort,
  transferFilter,
  transferFilterItemDisplay,
  transferFilterItemValue,
} from './../../interfaces/filters';
import { BehaviorSubject, Subject, Observable, of, combineLatest } from 'rxjs';
import { TransferDataFilterService } from 'src/app/services/transfer-data-filter.service';

const PRICE_SORT_ITEMS = [
  { value: 'scending', display: 'По возрастанию', attribute: priceSort.min },
  { value: 'descending', display: 'По убыванию', attribute: priceSort.max },
  {
    value: 'duration',
    display: 'По времени в пути',
    attribute: priceSort.duration,
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

  private refresh$ = new Subject();
  private destroy$ = new Subject();
  private filtersForm: FormGroup;

  public availableTransferValue = [...Object.values(transferFilterItemValue)];
  public availableTransferDisplay = [
    ...Object.values(transferFilterItemDisplay),
  ];

  dataReadiness: boolean = false;

  public availableCarrierValue: string[];
  public availableCarrierDisplay: string[];

  private mapToCheckboxArrayGroup(data: string[], display): FormArray {
    return this.fb.array(
      data.map((val, i) => {
        return this.fb.group({
          value: val,
          display: display[i],
          selected: false,
        });
      })
    );
  }

  prices$ = this.refresh$.pipe(
    startWith(true),
    switchMap(() => this.dataService.getPrice()),
    shareReplay(1),
    map((cost) => {
      const price = {
        minCost: cost['min'],
        maxCost: cost['max'],
      };
      return price;
    })
  );

  carriers$ = this.refresh$.pipe(
    startWith(true),
    switchMap(() => this.dataService.getCarriers()),
    map((e) => {
      const keys = [...Object.keys(e)];
      const values = [...Object.values(e)];
      const form = (this.filtersForm = this.fb.group({
        sort: [this.priceSortItems[0].attribute],
        transferFilter: this.mapToCheckboxArrayGroup(
          this.availableTransferValue,
          this.availableTransferDisplay
        ),
        minCost: [null],
        maxCost: [null],
        airlines: this.mapToCheckboxArrayGroup(keys, values),
      }));
      this.dataReadiness = true;
      return form;
    }),
    shareReplay(1)
  );

  dataFilter$ = combineLatest([this.prices$, this.carriers$]).pipe(
    map(([price, filter]) => {
      filter.patchValue(price);
      return filter;
    })
  );
  get transferFilterArray() {
    // console.log('transferFilterArray');
    return this.filtersForm.get('transferFilter') as FormArray;
  }

  get carrierFilterArray() {
    const carriers = this.filtersForm.get('airlines') as FormArray;
    // console.log('carrierFilterArray');
    return carriers;
  }

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dataService: DataService,
    private dataTransfer: TransferDataFilterService
  ) {}

  ngOnInit(): void {
    this.dataFilter$.pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
