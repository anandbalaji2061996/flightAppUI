import { Component, OnInit } from '@angular/core';
import { HttpService, FlightDetails } from '../service/HttpService.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-airline',
  templateUrl: './view-airline.component.html',
  styleUrls: ['./view-airline.component.css']
})
export class ViewAirlineComponent implements OnInit {

  flightDetails: any;
  status: boolean;
  tableStatus: boolean = true;
  fromPlace: any;
  toPlace: any;
  places: any;
  message: any;
  airlineName: any;
  airlines: any;
  constructor(private router: Router, private http: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.status = false;
    this.tableStatus = true;
    this.message = "";
    this.places = this.http.getPlace();
    this.http.getAllAirlineNames().subscribe(data => this.airlines = data),error => console.log(error)
    this.getAllAirline();
  }

  getAllAirline() {
    this.tableStatus = true;
    this.http.getAllAirline().subscribe(
      data => { 
        this.flightDetails = data;
        if(this.flightDetails.length == 0) {
          this.tableStatus = false;
          this.message = "No Records Found!"
        }
       }, error => console.log(error));
  }

  getSearch() {
    if(this.fromPlace == undefined && this.toPlace == undefined && this.airlineName == undefined) {
      console.log(this.fromPlace + " " + this.toPlace + " " + this.airlineName)
      this.getAllAirline();
    } else if(this.fromPlace == undefined || this.toPlace == undefined || this.airlineName == undefined) {
      alert("Please provide Airline Name, From place and To place");
    } else {      
      this.http.searchByAirlineAndFromPlaceAndToPlace(this.airlineName, this.fromPlace, this.toPlace).subscribe(
        data => {
          console.log(this.fromPlace + " " + this.toPlace)
          this.fromPlace = undefined;
          this.toPlace = undefined;
          this.airlineName = undefined;
          this.flightDetails = data;
          if(this.flightDetails.length == 0) {
            this.tableStatus = false;
            this.message = "No Records Found!"
          }
         }, error => console.log(error));
    }
  }

  deleteFlight(flightDetails : FlightDetails) {
    console.log(flightDetails)
    this.http.deleteFlight(flightDetails.flightNumber).subscribe(
      data => {
      this.getAllAirline()
      this.status = true;
      this.message = flightDetails.flightNumber + " operations has been cancelled by the admin!";
    }), error => console.log(error)
  }

  gotoAvailable() {
    this.router.navigate([this.router.url]);
  }

  gotoEdit(flightDetails : FlightDetails) {
    console.log(flightDetails.flightNumber);
    this.router.navigate(['/admin/edit/'+flightDetails.flightNumber])
  }

  gotoRegisterFlight() {
    this.router.navigate(['/admin/register']);
  }

  gotoManageAirline() {
    this.router.navigate(['/admin/registerAirline'])
  }
}
