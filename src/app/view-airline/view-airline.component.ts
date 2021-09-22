import { Component, OnInit } from '@angular/core';
import { HttpService, FlightDetails } from '../service/HttpService.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-airline',
  templateUrl: './view-airline.component.html',
  styleUrls: ['./view-airline.component.css']
})
export class ViewAirlineComponent implements OnInit {

  flightDetails: FlightDetails[];
  status: boolean;
  tableStatus: boolean = true;
  message: any;
  constructor(private router: Router, private http: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.status = false;
    this.tableStatus = true;
    this.message = "";
    this.getAllAirline();
  }

  getAllAirline() {
    this.http.getAllAirline().subscribe(
      data => { 
        this.flightDetails = data;
        if(this.flightDetails.length == 0) {
          this.tableStatus = false;
          this.message = "No Records Found!"
        }
       }, error => console.log(error));
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
}
