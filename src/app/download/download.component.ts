import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService, BookingDetails } from '../service/HttpService.service';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  selectedRecord:any;
  pnr: any;
  emailId: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      var id3 = params.get('id3');
      var id1 = params.get('id1');
     this.pnr = id3;
     this.emailId = id1;
    });
    this.getDetails(this.pnr);
  }

  getDetails(pnr1 : any) {
    console.log(pnr1)
    this.http.getByPnr(pnr1).subscribe(data => {
      console.log(data)
      this.selectedRecord = data;
    })
  }
  
  gotoView() {
    this.router.navigate(["user/" + this.emailId + "/flightBooking/view"]);
  }

  printPage() {
    window.print();
  }

}
