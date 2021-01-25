import { Injectable } from '@angular/core';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('assets/flights.json').pipe(
      map((val) => val['result'].flights),
      shareReplay(1)
    );
  }
}
