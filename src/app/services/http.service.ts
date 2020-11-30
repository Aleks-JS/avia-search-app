import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get('assets/flights.json').pipe(
            map(val => val['result'].flights.map(e => e.flight)))
    }

    getFlights() {
        return this.http.get('assets/flights.json').pipe(
            map(val => val['result'].flights.map(e => {
                const fl = e.flight
                const firstSegmentThere = fl.legs[0].segments[0]
                const lastSegmentThere =
                    fl.legs[0].segments[fl.legs[0].segments.length - 1]
                const firstSegmentBack = fl.legs[1].segments[0];

                const lastSegmentBack =
                    fl.legs[1].segments[fl.legs[1].segments.length - 1]
                return {
                    carrier: fl.carrier.caption,
                    carrierUid: fl.carrier.uid,
                    totalPrice: fl.price.total.amount,
                    departureCity: firstSegmentThere.departureCity.caption,
                    departureAirport: firstSegmentThere.departureAirport.caption,
                    departureAirportUid: firstSegmentThere.departureAirport.uid,
                    arrivalCity: !lastSegmentThere.arrivalCity ? lastSegmentThere.arrivalAirport.caption.split(',')[0] : lastSegmentThere.arrivalCity,
                    arrivalAirport: lastSegmentThere.arrivalAirport.caption,
                    arrivalAirportUid: lastSegmentThere.arrivalAirport.uid,
                    departureDateTime: new Date(firstSegmentThere.departureDate)
                        .toTimeString()
                        .slice(0, 5),
                    departureDateNum:
                        String(new Date(firstSegmentThere.departureDate).getDate()).length < 2
                            ? parseInt(`0${new Date(firstSegmentThere.departureDate).getDate()}`)
                            : new Date(firstSegmentThere.departureDate).getDate(),

                    departureDateMonth:
                        new Date(firstSegmentThere.departureDate).getMonth(),

                    departureDateDay:
                        new Date(firstSegmentThere.departureDate).getDay(),

                    departureDurationHour: Math.floor(fl.legs[0].duration / 60),
                    departureDurationMinutes: fl.legs[0].duration % 60,

                    arrivalDateTime: new Date(lastSegmentThere.arrivalDate)
                        .toTimeString()
                        .slice(0, 5),

                    arrivalDateNum:
                        String(new Date(lastSegmentThere.arrivalDate).getDate()).length < 2
                            ? parseInt(`0${new Date(lastSegmentThere.arrivalDate).getDate()}`)
                            : new Date(lastSegmentThere.arrivalDate).getDate(),

                    arrivalDateMonth:
                        new Date(lastSegmentThere.arrivalDate).getMonth(),

                    arrivalDateDay:
                        new Date(lastSegmentThere.arrivalDate).getDay(),

                    departureCarrierThere: fl.carrier.caption,

                    /*  Обратный маршрут   */
                    departureBackCity: !firstSegmentBack.departureCity ? firstSegmentBack.departureAirport.caption.split(',')[0] : firstSegmentBack.departureCity.caption,
                    departureBackAirport: firstSegmentBack.departureAirport.caption,
                    departureBackAirportUid: firstSegmentBack.departureAirport.uid,
                    arrivalBackCity: lastSegmentBack.arrivalCity.caption,
                    arrivalBackAirport: lastSegmentBack.arrivalAirport.caption,
                    arrivalBackAirportUid: lastSegmentBack.arrivalAirport.uid,

                    departureBackDateTime: new Date(firstSegmentBack.departureDate)
                        .toTimeString()
                        .slice(0, 5),

                    departureBackDateNum:
                        String(new Date(firstSegmentBack.departureDate).getDate()).length < 2
                            ? parseInt(`0${new Date(firstSegmentBack.departureDate).getDate()}`)
                            : new Date(firstSegmentBack.departureDate).getDate(),

                    departureBackDateMonth:
                        new Date(firstSegmentBack.departureDate).getMonth(),

                    departureBackDateDay:
                        new Date(firstSegmentBack.departureDate).getDay(),

                    departureBackDurationHour: Math.floor(
                        fl.legs[1].duration / 60
                    ),

                    departureBackDurationMinutes: fl.legs[1].duration % 60,

                    arrivalBackDateTime: new Date(lastSegmentBack.arrivalDate)
                        .toTimeString()
                        .slice(0, 5),

                    arrivalBackDateNum:
                        String(new Date(lastSegmentBack.arrivalDate).getDate()).length < 2
                            ? parseInt(`0${new Date(lastSegmentBack.arrivalDate).getDate()}`)
                            : new Date(lastSegmentBack.arrivalDate).getDate(),

                    arrivalBackDateMonth:
                        new Date(lastSegmentBack.arrivalDate).getMonth(),

                    arrivalBackDateDay:
                        new Date(lastSegmentBack.arrivalDate).getDay(),

                    departureBackCarrierThere: lastSegmentBack.airline.caption,

                    durationClassList:
                        fl.legs[0].segments.length - 1 < 1 ? "hide" : "show",

                    durationClassListBack:
                        fl.legs[1].segments.length - 1 < 1 ? "hide" : "show",

                }
            })),
            tap(console.log)

        )
    }
}