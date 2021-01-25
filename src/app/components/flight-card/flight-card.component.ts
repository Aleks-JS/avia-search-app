import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { DataService } from './../../services/data.service';
import { map, tap } from 'rxjs/operators';
import { TransferDataFilterService } from 'src/app/services/transfer-data-filter.service';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
  providers: [HttpService, DataService],
})
export class FlightCardComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private dataTransfer: TransferDataFilterService
  ) {}

  size = 2;

  dataFlight$ = this.dataService.getFlights().pipe(
    map((fl) => fl.slice(0, this.size)),
    tap(console.log)
  );

  ngOnInit(): void {
    // this.httpService.getFlights().subscribe(e => console.log(e))
  }
}
