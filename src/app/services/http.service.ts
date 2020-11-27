import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {

    flightsData$: Observable<void> = this.http.get('assets/flights.json').pipe(
        map(val => val['result'].flights.map(e => e.flight))
    )

    constructor(private http: HttpClient) { }

    getData() {
        return this.flightsData$
    }
}