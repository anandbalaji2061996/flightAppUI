import { Component, OnInit } from '@angular/core';
import { HttpService, Airline } from '../service/HttpService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {

  airlines: any;
  status: boolean;
  tableStatus: boolean;
  updateStatus: boolean;
  message: String;
  airline: Airline = new Airline("", "", "");

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.tableStatus = true;
    this.status = false;
    this.updateStatus = false;
    this.message = "";
    this.getAirlineDetails();
  }

  getAirlineDetails() {
    this.tableStatus = true;
    this.updateStatus = false;
    this.http.getAllAirlineDetails().subscribe(
      data => {
        console.log(data);
        this.airlines = data;
        if (this.airlines.length == 0) {
          this.tableStatus = false;
          this.message = "No Records Found!";
        }
      }
    )
  }

  getSelectedAirline(airline: any) {
    this.updateStatus = true;
    this.airline = airline;
  }

  deleteAirline(airline: Airline) {
    if (confirm("Are you sure you want to cancel airline operation of " + airline.name + " ?")) {
      this.http.deleteFlightByAirline(airline.name).subscribe(data => {
        this.http.deleteAirlineDetails(airline.name).subscribe(
          data => {
            console.log(data);
            if (data == "Success") {
              this.getAirlineDetails();
            }
          }, error => console.log(error)
        )
      }, error => console.log(error));
    }
  }

  registerAirline() {
    var flag = true;
    if (this.airline.name == "") {
      flag = false;
      alert("Please fill the Airline Name!");
    } else if (this.airline.address == "") {
      flag = false;
      alert("Please provide the Airline Address!");
    } else if (this.airline.contactNumber.length != 10) {
      flag = false;
      alert("Please provide 10 digit contact number!")
    }
    if (flag) {
      console.log(this.airline);
      this.airline.name = this.airline.name.toUpperCase();
      this.http.getAirlineByName(this.airline.name).subscribe(data => {
        if (data != null) {
          if (confirm("Are you sure you want to update the airline details of " + this.airline.name + " ?")) {
            this.http.updateAirline(this.airline, this.airline.name).subscribe(data => {
              console.log(data);
              this.getAirlineDetails();
              this.airline = new Airline("", "", "");
            }, error => console.log(error));
          } else {
            this.getAirlineDetails();
          }
        } else {
          this.http.registerAirlineDetails(this.airline).subscribe(
            data => {
              console.log(data);
              this.airline = new Airline("", "", "");
              this.getAirlineDetails();
            }, error => {
              console.log(error);
              alert("The Airline Name is registered by other. Please provide unique airline name!");
            }
          )
        }
      })
    }
  }

  gotoManageAirline() {
    this.router.navigate([this.router.url]);
  }

  gotoAvailable() {
    this.router.navigate(['/admin/view']);
  }

  gotoRegisterFlight() {
    this.router.navigate(['/admin/register'])
  }
}
