import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Flight } from './../interfaces/flight';
import { Carriers } from './../interfaces/carriers';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http
      .get('assets/flights.json')
      .pipe(map((val) => val['result'].flights));
  }

  getPrice() {
    return this.http.get('assets/flights.json').pipe(
      map((val) => {
        const cost = {};
        const allPrices = val[
          'result'
        ].flights.map((e: { flight: { price: { total: { amount: any } } } }) =>
          Number(e.flight.price.total.amount)
        );

        cost['max'] = allPrices.reduce((a: number, b: number) =>
          Math.max(a, b)
        );
        cost['min'] = allPrices.reduce((a: number, b: number) =>
          Math.min(a, b)
        );

        return cost;
      })
    );
  }
}
