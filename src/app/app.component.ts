import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { HttpService } from './services/http.service';

// const priceSortItems = [
//   {
//     item: 'По возрастанию',
//     value: 'scending',
//   },
//   {
//     item: 'По убыванию',
//     value: 'descending',
//   },
//   {
//     item: 'По времени в пути',
//     value: 'way',
//   },
// ];
// const transferFilterItems = [
//   {
//     item: 'Без пересадок',
//     value: 'withoutTransfers',
//   },
//   {
//     item: 'Одна пересадка',
//     value: 'oneTransfers'
//   },
// ];

const initNumbersOfCards: number = 2

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService],
})
export class AppComponent implements OnInit {
  // priceItems = priceSortItems;
  // transferItems = transferFilterItems;
  // defaultPriceItem = priceSortItems[0].item;
  // defaultTransferItem = transferFilterItems[0].item;

  countCard$ = new BehaviorSubject(initNumbersOfCards)

  formSort = new FormGroup({
    priceSort: new FormControl("scending"),
  });

  formFilter = new FormGroup({
    transferFilter: new FormControl('withoutTransfers'),
  });


  dataFlight$ = new Subject()

  constructor(private httpService: HttpService) { }


  ngOnInit(): void {
    this.dataFlight$.next(this.httpService.getData())
    this.dataFlight$.pipe(
      tap(console.log)
    )
  }

  counter() {
    this.countCard$.next(this.countCard$.value + 1)
  }


}
