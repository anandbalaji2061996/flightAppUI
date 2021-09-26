import { Component, OnInit } from '@angular/core';
import { HttpService, FlightDetails, BookingDetailsFromUI } from '../service/HttpService.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flightbooking',
  templateUrl: './flightbooking.component.html',
  styleUrls: ['./flightbooking.component.css']
})
export class FlightbookingComponent implements OnInit {

  flightDetails: any;
  ticketCost: any;
  status: boolean;
  message: any;
  foodMenu: any;
  fromPlace: any;
  toPlace: any;
  places: any;
  tableStatus: boolean = false;
  discount: number;
  username: any;
  bookingDetailsDisplay: BookingDetailsFromUI = new BookingDetailsFromUI("", "", 1, "", "", "", "", 1, "", "");
  // daysOfWeek: String[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  flightWorkingDays: String;
  constructor(private router: Router, private http: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.status = false;
    this.message = "";
    this.discount = 0;
    this.activatedRoute.paramMap.subscribe(params => {
      var id = params.get('id1');
      this.bookingDetailsDisplay.emailId = id;
      this.http.getUserDetails(id).subscribe(data => {
        console.log(data);
        this.bookingDetailsDisplay.name = data
      }), error => console.log(console.error());
    });

    this.places = this.http.getPlace();
    this.getAllAirline();
  }

  getAllAirline() {
    this.tableStatus = true;
    this.http.getAllAirline().subscribe(data => { this.flightDetails = data }, error => console.log(error));
  }

  getFlightDetails(flightDetails: FlightDetails) {
    console.log(flightDetails);
    this.bookingDetailsDisplay.dateofTravel = flightDetails.startDateTime;
    this.bookingDetailsDisplay.flightNumber = flightDetails.flightNumber;
    this.bookingDetailsDisplay.discountCode = flightDetails.discountCode;
    this.discount = flightDetails.discount;
    if (flightDetails.meals == "Both")
      this.foodMenu = ["Veg", "Non-Veg"]
    else if (flightDetails.meals == "Veg")
      this.foodMenu = ["Veg"];
    else
      this.foodMenu = ["Non-Veg"];
    this.ticketCost = flightDetails.ticketCost;
    this.bookingDetailsDisplay.ticketCost = this.ticketCost;
    this.bookingDetailsDisplay.numberOfSeats = 1;
    this.flightWorkingDays = flightDetails.scheduledDays;
  }

  getSearch() {
    if (this.fromPlace == undefined || this.toPlace == undefined) {
      console.log(this.fromPlace + " " + this.toPlace)
      this.getAllAirline();
    } else {
      this.http.searchFlight(this.fromPlace, this.toPlace).subscribe(
        data => {
          console.log(this.fromPlace + " " + this.toPlace)
          this.fromPlace = undefined;
          this.toPlace = undefined;
          this.flightDetails = data;
          if (this.flightDetails.length == 0) {
            this.tableStatus = false;
            this.message = "No Records Found!"
          }
        }, error => console.log(error));
    }
  }

  bookATicket(flightNumber: any) {
    this.status = false;
    if (this.bookingDetailsDisplay.flightNumber == "") {
      this.status = true;
      this.message = "Please choose the Flight you want to book!";
    } else if (this.bookingDetailsDisplay.name == "") {
      this.status = true;
      this.message = "Please enter your Name!";
    } else if (this.bookingDetailsDisplay.numberOfSeats == 0) {
      this.status = true;
      this.message = "Please enter number of seats to book!";
    } else if (this.bookingDetailsDisplay.mealOption == "") {
      this.status = true;
      this.message = "Please enter your meal option!";
    } else if (this.bookingDetailsDisplay.seatType == "") {
      this.status = true;
      this.message = "Please enter your seat type either Business class or Non-Business class";
      // } else if(this.bookingDetailsDisplay.seatnos == "") {
      //   this.status = true;
      //   this.message = "Please enter the seat numbers in format 1,2,3...";
    } else if (this.bookingDetailsDisplay.passengerDetails == "") {
      this.status = true;
      this.message = "Please enter the passenger details in the format Name-Gender-Age,Name-Gender-Age,..."
    } else {
      var d = new Date(this.bookingDetailsDisplay.dateofTravel).getDay();
      if (this.flightWorkingDays == "WeekEnd") {
        if (d == 0 || d == 6) {
          if(new Date(this.bookingDetailsDisplay.dateofTravel) > new Date()) {
            console.log("Date Accepted");
          } else {
            this.status = true;
            this.message = "Please provide the Future date.";
          }
        } else {
          this.status = true;
          this.message = "Please provide the week end date[Sunday/Saturday]"
        }
      } else if (this.flightWorkingDays == "WeekDays") {
        if (d >= 1 && d <= 5) {
          console.log("WeekDays");
          if(new Date(this.bookingDetailsDisplay.dateofTravel) > new Date()) {
            console.log("Date Accepted");
          } else {
            this.status = true;
            this.message = "Please provide the Future date.";
          }
        } else {
          this.status = true;
          this.message = "Please provide the week days date[Monday - Friday]"
        }
      } else {
        if(new Date(this.bookingDetailsDisplay.dateofTravel) > new Date()) {
          console.log("Date Accepted");
        } else {
          this.status = true;
          this.message = "Please provide the Future date.";
        }
        console.log("Daily")
      }
      // if(this.bookingDetailsDisplay.numberOfSeats != this.bookingDetailsDisplay.seatnos.split(",").length) {
      //   this.status = true;
      //   this.message = "Please provide only "+this.bookingDetailsDisplay.numberOfSeats+" in seat numbers field!"
      // }
      if (this.bookingDetailsDisplay.numberOfSeats != this.bookingDetailsDisplay.passengerDetails.split(",").length) {
        this.status = true;
        this.message = "Please provide " + this.bookingDetailsDisplay.numberOfSeats + " passenger details only in passenger details field!"
      }
      if (!this.status) {
        this.bookingDetailsDisplay.ticketCost = this.bookingDetailsDisplay.ticketCost * this.bookingDetailsDisplay.numberOfSeats;
        this.bookingDetailsDisplay.ticketCost = this.bookingDetailsDisplay.ticketCost - (this.bookingDetailsDisplay.ticketCost * this.discount / 100);
        if (this.bookingDetailsDisplay.mealOption == "Non-Veg") {
          this.bookingDetailsDisplay.ticketCost += 200 * this.bookingDetailsDisplay.numberOfSeats
        } else if (this.bookingDetailsDisplay.mealOption == "Veg") {
          this.bookingDetailsDisplay.ticketCost += 100 * this.bookingDetailsDisplay.numberOfSeats
        }
        console.log(this.bookingDetailsDisplay)
        this.http.bookATicket(flightNumber, this.bookingDetailsDisplay).subscribe(
          data => {
            console.log(data)
            alert("Successfully Booked!")
            this.gotoView();
          }
        ), error => console.log(error)
      }
    }
  }

  loadCost(e) {
    if (e.target.value == "Non - Business Class") {
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
