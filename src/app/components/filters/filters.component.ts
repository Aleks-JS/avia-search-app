import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { HttpService } from './../../services/http.service';
import { priceSort, transferFilter } from './../../interfaces/filters';

const PRICE_SORT_ITEMS = [
  { value: 'scending', display: 'По возрастанию', attribute: priceSort.min },
  { value: 'descending', display: 'По убыванию', attribute: priceSort.max },
  { value: 'duration', display: 'По времени в пути', attribute: priceSort.duration },
];

const TRANSPLANTS_FILTER_ITEMS = [
  { value: 'one-segment', display: 'Без пересадок', attribute: transferFilter.withoutTransfers },
  { value: 'two-segment', display: 'Одна пересадка', attribute: transferFilter.oneTransplant },
]

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  priceSortItems = PRICE_SORT_ITEMS;
  transplantsFilterItems = TRANSPLANTS_FILTER_ITEMS;

  filtersForm = this.fb.group({
    sort: [this.priceSortItems[0].attribute],
    transferFilter: this.transplantsFilterItems,
    minCost: [0],
    maxCost: [100000],
  });

  dataFlight$ = this.httpService.getData()


  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  ngOnInit(): void {
  }
}
