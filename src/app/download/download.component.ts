import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../service/HttpService.service';
import { TokenStorageService } from '../service/token-storage.service';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  selectedRecord:any;
  pnr: any;
  emailId: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, private token: TokenStorageService) { }

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
    },error => {
      if(error.status == 500)
      alert("Session Expired! Please Login again!")
      this.gotoLogin();
    })
  }
  
  gotoView() {
    this.router.navigate(["user/" + this.emailId + "/flightBooking/view"]);
  }

  gotoLogin() {
    this.router.navigate(["user"]);
  }

  printPage() {
    window.print();
  }

}
