import { Component, OnInit } from '@angular/core';
import { HttpService, FlightDetails, BookingDetailsFromUI } from '../service/HttpService.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flightbooking',
  templateUrl: './flightbooking.component.html',
  styleUrls: ['./flightbooking.component.css']
})
export class FlightbookingComponent implements OnInit {

  flightDetails: FlightDetails[];
  ticketCost:any;
  bookingDetailsDisplay: BookingDetailsFromUI = new BookingDetailsFromUI("","",1,"","","","","",1,"");
  constructor(private router: Router, private http: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      var id = params.get('id1');
      this.bookingDetailsDisplay.emailId = id;
    });    
    this.http.getAllAirline().subscribe(data => {this.flightDetails = data}, error => console.log(error));
  }

  getFlightDetails(flightDetails: FlightDetails) {
    console.log(flightDetails);
    this.bookingDetailsDisplay.dateofTravel = flightDetails.startDateTime;
    this.bookingDetailsDisplay.flightNumber = flightDetails.flightNumber;
    this.ticketCost = parseInt(flightDetails.ticketCost);
    this.bookingDetailsDisplay.ticketCost = this.ticketCost;
    this.bookingDetailsDisplay.numberOfSeats = 1;
  }

  bookATicket(flightNumber:any) {
    this.bookingDetailsDisplay.ticketCost = this.bookingDetailsDisplay.ticketCost*this.bookingDetailsDisplay.numberOfSeats;
    if(this.bookingDetailsDisplay.mealOption == "Non-Veg") {
      this.bookingDetailsDisplay.ticketCost += 200*this.bookingDetailsDisplay.numberOfSeats 
    } else if(this.bookingDetailsDisplay.mealOption == "Veg"){
      this.bookingDetailsDisplay.ticketCost += 100*this.bookingDetailsDisplay.numberOfSeats 
    }
    console.log(this.bookingDetailsDisplay)
    // this.http.bookATicket(flightNumber, this.bookingDetailsDisplay).subscribe(
    //   data => console.log(data)
    // ), error => console.log(error)
  }

  loadCost(e) {
    if(e.target.value == "Non - Business Class") {
      this.bookingDetailsDisplay.ticketCost = this.ticketCost;
    } else {
      this.bookingDetailsDisplay.ticketCost = this.ticketCost + 1000;
    }
  }

  gotoView() {
    this.router.navigate([this.router.url + "/view"]);
  }

  gotoFlightBooking() {
    this.router.navigate([this.router.url]);
  }
}
