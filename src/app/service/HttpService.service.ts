import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class UserLoginCredentials{
  constructor(
    public emailId:string,
    public password:string
  ) {}
}

export class UserDetails{
  constructor(
    public name:string,
    public emailId:string,
    public password:string
  ) {}
}

export class FlightDetails{
  constructor(
    public flightNumber:string,
    public airline:string,
    public fromPlace:string,
    public toPlace:string,
    public startDateTime:string,
    public endDateTime:string,
    public scheduledDays:string,
    public nosOfBusinessClassSeats:string,
    public nosOfNonBusinessClassSeats:string,
    public ticketCost:string,
    public nosOfRows:string,
    public meals:string
  ) {}
}

export class BookingDetailsFromUI{
  constructor(
    public name:string,
    public emailId:string,
    public numberOfSeats:number,
    public passengerDetails:string,
    public seatType:string,
    public mealOption:string,
    public seatnos:string,
    public dateofTravel:string,
    public ticketCost:number,
    public flightNumber:string
  ) {}
}

export class BookingDetails{
  constructor(
    public pnr:string,
    public name:string,
    public emailId:string,
    public numberOfSeats:number,
    public seatType:string,
    public mealOption:string,
    public seatnos:string,
    public dateofTravel:string,
    public ticketCost:number,
    public flightNumber:string
  ) {}
}



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http:HttpClient) { }

  //GetMethod
  getAllAirline():Observable<any> {
    return this.http.get('http://localhost:8082/admin/api/v1.0/flight/airline');
  }

  loginUser(userLoginDetails: UserLoginCredentials) {
    return this.http.post('http://localhost:8081/user/api/v1.0/flight/login', userLoginDetails, {responseType: 'text'});
  }

  //Post Method
  registerUser(userDetails: UserDetails) {
    return this.http.post('http://localhost:8081/user/api/v1.0/flight/register', userDetails, {responseType: 'text'});
  }

  bookATicket(flightNumber:any,bookingDetailsDisplay: BookingDetailsFromUI) {
    return this.http.post('http://localhost:8081/user/api/v1.0/flight/booking/'+flightNumber,bookingDetailsDisplay);
  }

  getBookedTicket(emailId:any):Observable<any> {
    return this.http.get('http://localhost:8081/user/api/v1.0/flight/booking/history/'+emailId)
  }

  deleteBookedTicket(pnr:any) {
    return this.http.delete('http://localhost:8081/user/api/v1.0/flight/booking/cancel/'+pnr)
  }
  
}
