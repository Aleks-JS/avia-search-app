import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {

    data$ = new Subject()

    data = this.http.get('assets/flights.json').subscribe(e => this.data$.next(e))

    obsData$ = this.data$.asObservable().pipe(
        map(val => val['result'].flights.map(e => e.flight))
    )

    constructor(private http: HttpClient) { }

    getData() {
        return this.obsData$
    }
}