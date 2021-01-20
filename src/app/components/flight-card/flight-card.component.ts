import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    // this.httpService.getFlights().subscribe(e => console.log(e))
  }
}
