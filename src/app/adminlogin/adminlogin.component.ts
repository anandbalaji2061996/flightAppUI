import { Component, OnInit } from '@angular/core';
import { HttpService, AdminLoginCredentials } from '../service/HttpService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  adminLogin: AdminLoginCredentials = new AdminLoginCredentials("", "");
  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loginAdmin() {
    console.log(this.adminLogin)
    this.httpService.loginAdmin(this.adminLogin).subscribe(data => {
      console.log(data);
      if (data == "Success")
        this.nextUrl(this.adminLogin.username);
      else
        alert("Invalid Credentials! Please enter valid admin credentials!");

    }, error => {
      alert("Invalid Credentials! Please enter valid admin credentials!");
      console.log(error)});
  }

  nextUrl(emailId) {
    console.log(emailId)
    this.router.navigate(["/admin/view"]);
  }
}

