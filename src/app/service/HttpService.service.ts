import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const place: String[] = ["Bangalore", "Chennai", "Coimbatore", "Delhi", "Hyderabad", "Mumbai", "Pune"];

export class AdminLoginCredentials {
  constructor(
    public username: string,
    public password: string
  ) { }
}

export class FlightDetails {
  constructor(
    public flightNumber: string,
    public airline: string,
    public fromPlace: string,
    public toPlace: string,
    public startDateTime: string,
    public endDateTime: string,
    public scheduledDays: string,
    public nosOfBusinessClassSeats: number,
    public nosOfNonBusinessClassSeats: number,
    public ticketCost: number,
    public nosOfRows: number,
    public meals: string,
    public discountCode: string,
    public discount: number
  ) { }
}

export class BookingDetailsFromUI {
  constructor(
    public name: string,
    public emailId: string,
    public numberOfSeats: number,
    public passengerDetails: [],
    public seatType: string,
    public mealOption: string,
    // public seatnos: string,
    public dateofTravel: string,
    public fromPlace: string,
    public toPlace: string,
    public departureTime: string,
    public arrivalTime: string,
    public ticketCost: number,
    public discountCode: string,
    public flightNumber: string
  ) { }
}

export class BookingDetails {
  constructor(
    public pnr: string,
    public name: string,
    public emailId: string,
    public numberOfSeats: number,
    public seatType: string,
    public mealOption: string,
    // public seatnos: string,
    public dateOfTravel: string,
    public fromPlace: string,
    public toPlace: string,
    public departureTime: string,
    public arrivalTime: string,
    public ticketCost: number,
    public discountCode: string,
    public flightNumber: string
  ) { }
}

export class FlightAvailability {
  constructor(
    public flightNumber: string,
    public airline: string,
    public fromPlace: string,
    public toPlace: string,
    public journeyDate: string,
    public nosOfBusinessClassSeats: number,
    public nosOfNonBusinessClassSeats: number,
    public nosOfBookedBusinessClassSeats: number,
    public nosOfBookedNonBusinessClassSeats: number,
  ) { }
}

export class Airline {
  constructor(
    public name: string,
    public address: string,
    public contactNumber: string,
  ) { }
}

const BASEURL_USER: string = "http://3.133.12.96:8091/api1/v1.0/user/flight/";
const BASEURL_ADMIN: string = "http://3.135.229.99:8092/api2/v1.0/admin/flight/";
const BASEURL_AIRLINE: string = "http://18.218.232.250:8093/api3/v1.0/admin/airline/";

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(public http: HttpClient) { }

  getPlace() {
    return place;
  }

  //User

  bookATicket(flightNumber: any, bookingDetailsDisplay: BookingDetailsFromUI) {
    return this.http.post(BASEURL_USER + 'booking/' + flightNumber, bookingDetailsDisplay, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  getBookedTicket(emailId: any): Observable<any> {
    return this.http.get(BASEURL_USER + 'booking/history/' + emailId)
  }

  getByPnr(pnr: any): Observable<any> {
    return this.http.get(BASEURL_USER + 'ticket/' + pnr)
  }

  deleteBookedTicket(pnr: any) {
    return this.http.delete(BASEURL_USER + 'booking/cancel/' + pnr, { responseType: 'text' })
  }

  getUserDetails(emailId: any) {
    return this.http.get(BASEURL_USER + 'userDetails/' + emailId, { responseType: 'text' })
  }

  //Admin

  getAllAirline(): Observable<any> {
    return this.http.get(BASEURL_ADMIN + 'airline');
  }

  getAirlineByFlightNumber(flightNumber: any) {
    return this.http.get(BASEURL_ADMIN + 'airline/flightNumber/' + flightNumber, { responseType: 'json' });
  }

  loginAdmin(adminLoginDetails: AdminLoginCredentials) {
    return this.http.post(BASEURL_ADMIN + 'login', adminLoginDetails, { responseType: 'text' });
  }

  registerAirline(flightDetails: FlightDetails) {
    return this.http.post(BASEURL_ADMIN + 'airline/register', flightDetails, {responseType: 'text' });
  }

  updateInventory(flightNumber: any, flightDetails: FlightDetails) {
    return this.http.put(BASEURL_ADMIN + 'airline/inventory/add/' + flightNumber, flightDetails, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  deleteFlight(flightNumber: any) {
    return this.http.delete(BASEURL_ADMIN + 'airline/delete/' + flightNumber, { responseType: 'text' })
  }

  deleteFlightByAirline(airline: any) {
    return this.http.delete(BASEURL_ADMIN + 'airline/airlineDelete/' + airline, {responseType: 'text'})
  }

  searchFlight(fromPlace: any, toPlace: any) {
    return this.http.get(BASEURL_ADMIN + 'airline/fromPlace/' + fromPlace + "/toPlace/" + toPlace)
  }

  searchByAirlineAndFromPlaceAndToPlace(airline: any, fromPlace: any, toPlace: any) {
    return this.http.get(BASEURL_ADMIN + 'airline/airlineName/' + airline + '/fromPlace/' + fromPlace + '/toPlace/' + toPlace);
  }

  saveAvailability(flightAvailability: FlightAvailability) {
    return this.http.post(BASEURL_ADMIN + '/airline/availability', flightAvailability, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  getAvailability(flightAvailability: FlightAvailability) {
    return this.http.post(BASEURL_ADMIN + '/airline/seats/availability', flightAvailability, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  updateSeatAvailabilityAfterCancel(flightAvailability: FlightAvailability) {
    return this.http.post(BASEURL_ADMIN + '/airline/seats/availability/aftercancel', flightAvailability, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  //Airline
  getAllAirlineDetails() {
    return this.http.get(BASEURL_AIRLINE + 'all');
  }

  registerAirlineDetails(airline: Airline) {
    return this.http.post(BASEURL_AIRLINE + 'register', airline, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  deleteAirlineDetails(name: any) {
    return this.http.delete(BASEURL_AIRLINE + 'delete/' + name, { responseType: 'text' });
  }

  getAllAirlineNames() {
    return this.http.get(BASEURL_AIRLINE + 'names');
  }

  getAirlineByName(name:any) {
    return this.http.get(BASEURL_AIRLINE + "names/"+name)
  }

  updateAirline(airline:any, name: string) {
    return this.http.put(BASEURL_AIRLINE + "update/" + name, airline);
  }
}
