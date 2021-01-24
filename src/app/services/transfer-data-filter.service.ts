import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransferDataFilterService {
  data$ = new Subject();
  resultData$ = new Subject();

  constructor() {}

  setData(data) {
    this.data$.next(data);
  }
}
