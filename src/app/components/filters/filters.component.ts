import { priceSort } from './../../interfaces/filters';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

const PRICE_SORT_ITEMS = [
  { value: 'scending', display: 'По возрастанию', attribute: priceSort.min },
  { value: 'descending', display: 'По убыванию', attribute: priceSort.max },
  { value: 'duration', display: 'По времени в пути', attribute: priceSort.duration },
];

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  priceSortItems = PRICE_SORT_ITEMS;

  filtersForm = this.fb.group({
    sort: [this.priceSortItems[0].attribute]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(priceSort)
  }
}
