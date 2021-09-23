import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const place: String[] = ["Bangalore", "Chennai", "Coimbatore", "Delhi", "Hyderabad", "Mumbai", "Pune"];

export class UserLoginCredentials {
  constructor(
    public emailId: string,
    public password: string
  ) { }
}

export class AdminLoginCredentials {
  constructor(
    public username: string,
    public password: string
  ) { }
}

export class UserDetails {
  constructor(
    public name: string,
    public emailId: string,
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
    public meals: string
  ) { }
}

export class BookingDetailsFromUI {
  constructor(
    public name: string,
    public emailId: string,
    public numberOfSeats: number,
    public passengerDetails: string,
    public seatType: string,
    public mealOption: string,
    public seatnos: string,
    public dateofTravel: string,
    public ticketCost: number,
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
    public seatnos: string,
    public dateofTravel: string,
    public ticketCost: number,
    public flightNumber: string
  ) { }
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  getPlace() {
    return place;
  }

  //GetMethod
  getAllAirline(): Observable<any> {
    return this.http.get('http://localhost:8082/admin/api/v1.0/flight/airline');
  }

  getAirlineByFlightNumber(flightNumber: any) {
    return this.http.get('http://localhost:8082/admin/api/v1.0/flight/airline/flightNumber/' + flightNumber, {responseType : 'json'});
  }

  loginUser(userLoginDetails: UserLoginCredentials) {
    return this.http.post('http://localhost:8081/user/api/v1.0/flight/login', userLoginDetails, { responseType: 'text' });
  }

  loginAdmin(adminLoginDetails: AdminLoginCredentials) {
    return this.http.post('http://localhost:8082/admin/api/v1.0/flight/login', adminLoginDetails, { responseType: 'text' });
  }

  //Post Method
  registerUser(userDetails: UserDetails) {
    return this.http.post('http://localhost:8081/user/api/v1.0/flight/register', userDetails, { responseType: 'text' });
  }

  bookATicket(flightNumber: any, bookingDetailsDisplay: BookingDetailsFromUI) {
    return this.http.post('http://localhost:8081/user/api/v1.0/flight/booking/' + flightNumber, bookingDetailsDisplay, { responseType: 'json' });
  }

  registerAirline(flightDetails: FlightDetails) {
    return this.http.post('http://localhost:8082/admin/api/v1.0/flight/airline/register', flightDetails);
  }

  updateInventory(flightNumber: any,flightDetails: FlightDetails) {
    return this.http.put('http://localhost:8082/admin/api/v1.0/flight/airline/inventory/add/'+flightNumber, flightDetails);
  }

  deleteFlight(flightNumber: any) {
    return this.http.delete('http://localhost:8082/admin/api/v1.0/flight/airline/delete/' + flightNumber, { responseType: 'text' })
  }

  searchFlight(fromPlace:any, toPlace:any) {
    return this.http.get('http://localhost:8082/admin/api/v1.0/flight/airline/fromPlace/'+fromPlace+"/toPlace/"+toPlace)
  }

  getBookedTicket(emailId: any): Observable<any> {
    return this.http.get('http://localhost:8081/user/api/v1.0/flight/booking/history/' + emailId)
  }

  deleteBookedTicket(pnr: any) {
    return this.http.delete('http://localhost:8081/user/api/v1.0/flight/booking/cancel/' + pnr, { responseType: 'text' })
  }

}
