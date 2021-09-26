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
        if (data == "User registered successfully!")
        this.nextUrl(this.user.emailId);
      else
        alert("Credentials alredy available. Try with different credentials!");
      }, error => {
        alert("Credentials alredy available. Try with different credentials!");
       console.log(error)
    })
  };

  loginUser() {
    console.log(this.userLogin)
    this.httpService.loginUser(this.userLogin).subscribe(data => {
      console.log(data);
      if (data == "Success")
        this.nextUrl(this.userLogin.emailId);
      else
        alert("Invalid Credentials! Please register your user details!");

    }, error => {
      alert("Invalid Credentials! Please register your user details!");
      console.log(error)});
  }

  nextUrl(emailId) {
    console.log(emailId)
    this.router.navigate(["/user/" + emailId + "/flightBooking"]);
  }
}
