import { Component, OnInit } from '@angular/core';
import { HttpService, FlightDetails, BookingDetailsFromUI, FlightAvailability } from '../service/HttpService.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';

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
  bookingDetailsDisplay: BookingDetailsFromUI = new BookingDetailsFromUI("", "", 1, [], "", "", "", "", "", "", "", 1, "", "");
  flightAvailability: FlightAvailability = new FlightAvailability("", "", "", "", "", 0, 0, 0, 0);
  flightWorkingDays: String;
  passengerForm: FormGroup;
  constructor(private router: Router, private http: HttpService, private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService, private fb: FormBuilder) {
    this.passengerForm = this.fb.group({
      passengers: this.fb.array([]),
    });
  }

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
      }, error => {
        if (error.status == 500)
          alert("Session Expired! Please Login again!")
        this.gotoLogin();
        console.log(error)
      }), error => console.log(console.error());
    });

    this.places = this.http.getPlace();
    this.getAllAirline();
    this.addPassenger();
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
    this.bookingDetailsDisplay.departureTime = flightDetails.startDateTime;
    this.bookingDetailsDisplay.arrivalTime = flightDetails.endDateTime;
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
    this.bookingDetailsDisplay.fromPlace = flightDetails.fromPlace;
    this.bookingDetailsDisplay.toPlace = flightDetails.toPlace;
    this.flightAvailability.flightNumber = flightDetails.flightNumber;
    this.flightAvailability.airline = flightDetails.airline;
    this.flightAvailability.fromPlace = flightDetails.fromPlace;
    this.flightAvailability.toPlace = flightDetails.toPlace;
    this.flightAvailability.nosOfBusinessClassSeats = flightDetails.nosOfBusinessClassSeats;
    this.flightAvailability.nosOfNonBusinessClassSeats = flightDetails.nosOfNonBusinessClassSeats;
  }

  getSearch() {
    if (this.fromPlace == undefined || this.toPlace == undefined) {
      console.log(this.fromPlace + " " + this.toPlace)
      this.getAllAirline();
    } else if (this.fromPlace == this.toPlace) {
      alert("From Place and To place should not be same!")
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

  checkAvailability() {
    if (this.bookingDetailsDisplay.flightNumber == "")
      alert("Please choose your flight for booking!")
    else {
      let s = true;
      var d = new Date(this.bookingDetailsDisplay.dateofTravel).getDay();
      if (this.flightWorkingDays == "WeekEnd") {
        if (d == 0 || d == 6) {
          if (new Date(this.bookingDetailsDisplay.dateofTravel) > new Date()) {
            console.log("Date Accepted");
          } else {
            s = false;
            alert("Please provide the Future date.");
          }
        } else {
          s = false;
          alert("Please provide the week end date[Sunday/Saturday]")
        }
      } else if (this.flightWorkingDays == "WeekDays") {
        if (d >= 1 && d <= 5) {
          console.log("WeekDays");
          if (new Date(this.bookingDetailsDisplay.dateofTravel) > new Date()) {
            console.log("Date Accepted");
          } else {
            s = false;
            alert("Please provide the Future date.");
          }
        } else {
          s = false;
          alert("Please provide the week days date[Monday - Friday]");
        }
      } else {
        if (new Date(this.bookingDetailsDisplay.dateofTravel) > new Date()) {
          console.log("Date Accepted");
        } else {
          s = false;
          alert("Please provide the Future date.")
        }
        console.log("Daily")
      }


      if (s) {
        this.flightAvailability.journeyDate = this.bookingDetailsDisplay.dateofTravel;
        this.http.getAvailability(this.flightAvailability).subscribe(
          data => {
            if (data != null) {
              var response = data;
              alert("Number of available Business Class seats - " + (response.valueOf()['nosOfBusinessClassSeats'] - response.valueOf()['nosOfBookedBusinessClassSeats']) + " & Non-Business Class seats - " + (response.valueOf()['nosOfNonBusinessClassSeats'] - response.valueOf()['nosOfBookedNonBusinessClassSeats']))
            } else {
              alert("Number of available Business Class seats - " + this.flightAvailability.nosOfBusinessClassSeats + " & Non-Business Class seats - " + this.flightAvailability.nosOfNonBusinessClassSeats);
            }
          }, error => console.log(error))
      }
    }
  }

  bookATicket(flightNumber: any) {
    this.status = false;
    console.log(this.bookingDetailsDisplay.passengerDetails.length)

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
    } else if (this.bookingDetailsDisplay.passengerDetails.length != this.bookingDetailsDisplay.numberOfSeats) {
      this.status = true;
      this.message = "Please enter/save the passenger details for the number of seats entered."
    } else {
      var d = new Date(this.bookingDetailsDisplay.dateofTravel).getDay();
      if (this.flightWorkingDays == "WeekEnd") {
        if (d == 0 || d == 6) {
          if (new Date(this.bookingDetailsDisplay.dateofTravel) > new Date()) {
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
          if (new Date(this.bookingDetailsDisplay.dateofTravel) > new Date()) {
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
        if (new Date(this.bookingDetailsDisplay.dateofTravel) > new Date()) {
          console.log("Date Accepted");
        } else {
          this.status = true;
          this.message = "Please provide the Future date.";
        }
        console.log("Daily")
      }


      if (!this.status) {
        this.flightAvailability.journeyDate = this.bookingDetailsDisplay.dateofTravel;
        if (this.bookingDetailsDisplay.seatType == "Business Class") {
          this.flightAvailability.nosOfBookedBusinessClassSeats = this.bookingDetailsDisplay.numberOfSeats;
          this.flightAvailability.nosOfBookedNonBusinessClassSeats = 0;
        } else {
          this.flightAvailability.nosOfBookedNonBusinessClassSeats = this.bookingDetailsDisplay.numberOfSeats;
          this.flightAvailability.nosOfBookedBusinessClassSeats = 0;
        }
        this.http.saveAvailability(this.flightAvailability).subscribe(
          data => {
            console.log(data);
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
          }, error => {
            console.log(error);
            alert("Only few sets available. Please reduce number of seats or book another flight with different timings!");
          }
        ), error => console.error(error);
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

  gotoLogin() {
    this.router.navigate(["user"]);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.gotoLogin();
  }


  get passengers(): FormArray {
    return this.passengerForm.get("passengers") as FormArray
  }

  newPassenger(): FormGroup {
    return this.fb.group({
      name: 'name1',
      age: 20,
      gender: ''
    })
  }

  addPassenger() {
    if (this.passengers.length <= this.bookingDetailsDisplay.numberOfSeats - 1)
      this.passengers.push(this.newPassenger());
  }

  removePassenger(i: number) {
    if (this.passengers.length > 1)
      this.passengers.removeAt(i);
  }

  onSubmit() {
    if (this.passengers.length == this.bookingDetailsDisplay.numberOfSeats) {
      this.bookingDetailsDisplay.passengerDetails = this.passengerForm.value.passengers;
      console.log(this.bookingDetailsDisplay.passengerDetails);
      console.log(this.bookingDetailsDisplay)
    } else
      alert("Please enter only " + this.bookingDetailsDisplay.numberOfSeats + " the passenger details")
  }
}
