import { Component, OnInit } from '@angular/core';
import { HttpService, UserDetails, UserLoginCredentials } from '../service/HttpService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  user: UserDetails = new UserDetails("", "", "");
  userLogin: UserLoginCredentials = new UserLoginCredentials("", "");
  errorMessage: String;
  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerUser() {
    this.httpService.registerUser(this.user)
      .subscribe(data => {
        if (data == "Success")
        this.nextUrl(this.user.emailId);
      else
        alert("Invalid Credentials! Please register your user details!");
      }, error => console.log(error));

  };

  loginUser() {
    this.httpService.loginUser(this.userLogin).subscribe(data => {
      console.log(data);
      if (data == "Success")
        this.nextUrl(this.userLogin.emailId);
      else
        alert("Invalid Credentials! Please register your user details!");

    }, error => {
      console.log(error)});
  }

  nextUrl(emailId) {
    console.log(emailId)
    this.router.navigate(["/user/" + emailId + "/flightBooking"]);
  }
}
