import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService, BookingDetails } from '../service/HttpService.service';
@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {

  emailId: string;
  message:any;
  status:boolean = false;
  tableStatus:boolean = true;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService) { }
  bookingDetails: BookingDetails[];
  ngOnInit(): void {
    this.status = false;
    this.activatedRoute.paramMap.subscribe(params => {
      var id = params.get('id1');
      this.emailId = id;
      this.getBookedDetails(this.emailId);
    });
  }

  getBookedDetails(emailId) {
    this.http.getBookedTicket(emailId).subscribe(data => {
      console.log(data);
      this.bookingDetails = data;
      if (this.bookingDetails.length == 0) {
        this.tableStatus = false;
        this.message = "No Records Found!"
      }
    }, error => console.log(error));
  }

  deleteTicket(book: BookingDetails) {
    console.log(book.pnr)
    this.http.deleteBookedTicket(book.pnr).subscribe(data => {
      console.log(data);
      this.getBookedDetails(this.emailId)
      this.status = true;
      this.message = book.pnr + " ticket cancelled by the user " + this.emailId;
    }), error => console.log(error)
  }

  gotoView() {
    this.router.navigate([this.router.url]);
  }

  gotoFlightBooking() {
    this.router.navigate(["user/" + this.emailId + "/flightBooking"]);
  }

}
