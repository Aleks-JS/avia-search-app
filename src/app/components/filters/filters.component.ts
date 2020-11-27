import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

const PRICE_SORT_ITEMS = ['По возрастанию', 'По убыванию', 'По времени в пути']

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  priceSortItems = PRICE_SORT_ITEMS

  filtersForm = this.fb.group({

  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
