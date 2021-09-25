import { Component, OnInit } from '@angular/core';
import { HttpService, FlightDetails } from '../service/HttpService.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-airline-registration',
  templateUrl: './airline-registration.component.html',
  styleUrls: ['./airline-registration.component.css']
})
export class AirlineRegistrationComponent implements OnInit {

  status: boolean;
  message: any;
  flightDetails: FlightDetails = new FlightDetails("", "", "", "", "", "", "", 1, 1, 1, 1, "","",1);
  // daysOfWeek: String[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  flightWorkingDays: String;
  places: any;
  airline: any;
  constructor(private router: Router, private http: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.status = false;
    this.message = "";
    this.places = this.http.getPlace();
    this.http.getAllAirlineNames().subscribe(data => this.airline = data), error => console.log(error);
  }

  bookAFlight() {
    this.status = false;
    if (this.flightDetails.flightNumber == "") {
      this.status = true;
      this.message = "Please enter the Flight you want to book!";
    } else if (this.flightDetails.airline == "") {
      this.status = true;
      this.message = "Please enter your Airlines Name!";
    } else if (this.flightDetails.fromPlace == "") {
      this.status = true;
      this.message = "Please enter from place of the flight!";
    } else if (this.flightDetails.toPlace == "") {
      this.status = true;
      this.message = "Please enter your to place of the flight!";
    } else if (this.flightDetails.startDateTime == "") {
      this.status = true;
      this.message = "Please enter your start time of the journey";
    } else if (this.flightDetails.endDateTime == "") {
      this.status = true;
      this.message = "Please enter your end time of the journey";
    } else if (this.flightDetails.ticketCost <= 1) {
      this.status = true;
      this.message = "Please enter the ticket cost";
    } else if (this.flightDetails.nosOfBusinessClassSeats <= 1) {
      this.status = true;
      this.message = "Please enter number of Business class ticket";
    } else if (this.flightDetails.nosOfNonBusinessClassSeats <= 1) {
      this.status = true;
      this.message = "Please enter number of Non-Business class ticket";
    } else if (this.flightDetails.nosOfRows <= 1) {
      this.status = true;
      this.message = "Please enter the number of rows in the flight";
    } else if (this.flightDetails.meals == "") {
      this.status = true;
      this.message = "Please enter the meal option provided in the flight";
    } else if (this.flightDetails.scheduledDays == "") {
      this.status = true;
      this.message = "Please enter the scheduled days of the flight";
    } else if(this.flightDetails.discountCode == "") {
      this.status = true;
      this.message = "Please enter the Discount code for the flight";
    } else if(this.flightDetails.discount <= 1) {
      this.status = true;
      this.message = "Please enter the Discount Percentage for the flight";
    }

    if (!this.status) {
      console.log(this.flightDetails)
      this.http.registerAirline(this.flightDetails).subscribe(
        data => {
          console.log(data)
          alert("Successfully Registered the Flight details!")
          this.gotoAvailable();
        }, error=> {
          alert("The FlightNumber " + this.flightDetails.flightNumber + " is already Registered. Please provide unique number!")
          console.error(error)}
        
      ), error => {
        console.log(error)
      }
    }
  }

  gotoRegisterFlight() {
    this.router.navigate([this.router.url]);
  }

  gotoAvailable() {
    this.router.navigate(['/admin/view']);
  }

  gotoManageAirline() {
    this.router.navigate(['/admin/registerAirline'])
  }
}
