export interface Flight {
    carrier: string,
    carrierUid: string,
    totalPrice: string,
    departureCity: string,
    departureAirport: string,
    departureAirportUid: string,
    arrivalCity: string,
    arrivalAirport: string,
    arrivalAirportUid: string,
    departureDateTime: string,
    departureDateNum: number,
    departureDateMonth: number,
    departureDateDay: number,
    departureDurationHour: number,
    departureDurationMinutes: number,
    arrivalDateTime: string,
    arrivalDateNum: number,
    arrivalDateMonth: number,
    arrivalDateDay: number,
    departureCarrierThere: string,
    departureBackCity: string,
    departureBackAirport: string,
    arrivalBackCity: string,
    arrivalBackAirport: string,
    arrivalBackAirportUid: string,
    departureBackDateTime: string,
    departureBackDateNum: number,
    departureBackDateMonth: number,
    departureBackDateDay: number,
    departureBackDurationHour: number,
    departureBackDurationMinutes: number,
    arrivalBackDateTime: string,
    arrivalBackDateNum: number,
    arrivalBackDateMonth: number,
    arrivalBackDateDay: number,
    departureBackCarrierThere: string
}
