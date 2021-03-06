import { Component, OnInit } from '@angular/core';
import { HttpService, FlightDetails } from '../service/HttpService.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-airline',
  templateUrl: './edit-airline.component.html',
  styleUrls: ['./edit-airline.component.css']
})
export class EditAirlineComponent implements OnInit {

  status: boolean;
  message: any;
  flightNo: any;
  flightDetails: any;
  flightWorkingDays: String;
  places : any;
  airline: any;
  constructor(private router: Router, private http: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.status = false;
    this.message = "";
    this.activatedRoute.paramMap.subscribe(params => {
      var id = params.get('id2');
      this.flightNo = id;
    });
    this.places = this.http.getPlace();
    this.http.getAllAirlineNames().subscribe(data => this.airline = data), error => console.log(error);
    this.getFlightDetails(this.flightNo);    
  }

  getFlightDetails(flightNumber: any) {
    this.http.getAirlineByFlightNumber(flightNumber).subscribe(
      data => {
        console.log(data);
        this.flightDetails = data;
      }, error => {
        console.log(error)
      }
    )
  }

  updateFlight(flightNumber: any) {
    this.status = false;
    if (this.flightDetails.airline == "") {
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
    } else if(this.flightDetails.fromPlace == this.flightDetails.toPlace) {
      this.status = true;
      this.message = "From Place and To Place should not be same";
      alert("From Place and To Place should not be same!")
    }

    this.flightDetails.discountCode = this.flightDetails.discountCode.toUpperCase();

    if (!this.status) {
      console.log(this.flightDetails)
      this.http.updateInventory(this.flightNo,this.flightDetails).subscribe(
        data => {
          console.log(data)
          alert("Successfully Updated the Flight details!")
          this.gotoAvailable();
        }, error=> {
          console.error(error)}
        
      ), error => {
        console.log(error)
      }
    }
  }

  gotoRegisterFlight() {
    this.router.navigate(["/admin/register"]);
  }

  gotoAvailable() {
    this.router.navigate(['/admin/view']);
  }

  gotoManageAirline() {
    this.router.navigate(["/admin/registerAirline"]);
  }

}
