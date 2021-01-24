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

// const TRANSPLANTS_FILTER_ITEMS = [
//   {
//     value: transferFilterItemValue,
//     display: 'Без пересадок',
//     attribute: transferFilterItemValue.withoutTransfers,
//     selected: false,
//   },
//   {
//     value: transferFilterItemValue,
//     display: 'Одна пересадка',
//     attribute: transferFilterItemValue.oneTransplant,
//     selected: false,
//   },
// ];

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  providers: [HttpService, DataService],
})
export class FiltersComponent implements OnInit, OnDestroy {
  priceSortItems = PRICE_SORT_ITEMS;
  // transplantsFilterItems = TRANSPLANTS_FILTER_ITEMS;

  private refresh$ = new Subject();
  private destroy$ = new Subject();
  public availableTransferValue = [...Object.values(transferFilterItemValue)];
  public availableTransferDisplay = [
    ...Object.values(transferFilterItemDisplay),
  ];

  private mapToCheckboxArrayGroup(
    data: string[],
    display: string[]
  ): FormArray {
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

  get transferFilterArray() {
    return this.filtersForm.get('transferFilter') as FormArray;
  }

  filtersForm: FormGroup = this.fb.group({
    sort: [this.priceSortItems[0].attribute],
    transferFilter: this.mapToCheckboxArrayGroup(
      this.availableTransferValue,
      this.availableTransferDisplay
    ),
    minCost: [null],
    maxCost: [null],
    airlines: [null],
  });

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

  filterData$ = this.refresh$.pipe(
    startWith(this.filtersForm.value),
    switchMap(() => this.filtersForm.valueChanges),
    map((e) => {
      console.log(e);
      console.log(this.filtersForm.controls);
    })
  );

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dataService: DataService,
    private dataTransfer: TransferDataFilterService
  ) {}

  ngOnInit(): void {
    this.prices$.pipe(takeUntil(this.destroy$)).subscribe((cost) => {
      this.filtersForm.patchValue({
        minCost: cost['min'],
        maxCost: cost['max'],
      });
    });

    this.filterData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => console.log(e));

    console.log(this.filtersForm.controls.transferFilter);
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

  onCheckboxChange(e) {
    console.log(e.target.value);
    // const formArr: FormArray = this.filtersForm.get(
    //   'transferFilter'
    // ) as FormArray;

    // if (e.target.checked) {
    //   formArr.push(new FormControl(e.target.value));
    // } else {
    //   const index = formArr.controls.findIndex(
    //     (x) => x.value === e.target.value
    //   );
    //   formArr.removeAt(index);
    // }
  }
}
