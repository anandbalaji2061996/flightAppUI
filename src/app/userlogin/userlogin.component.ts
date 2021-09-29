import { Component, OnInit } from '@angular/core';
import { AuthService, UserDetails, UserLoginCredentials } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  user: UserDetails = new UserDetails("", "", "");
  userLogin: UserLoginCredentials = new UserLoginCredentials("", "");
  errorMessage: String;
  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessful = false;
  isSignUpFailed = false;
  roles: string[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  // registerUser() {
  //   this.authService.registerUser(this.user)
  //     .subscribe(data => {
  //       if (data == "User registered successfully!")
  //       this.nextUrl(this.user.email);
  //     else
  //       alert("Credentials alredy available. Try with different credentials!");
  //     }, error => {
  //       alert("Credentials alredy available. Try with different credentials!");
  //      console.log(error)
  //   })
  // };
  registerUser() {
    this.authService.registerUser(this.user).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        alert("Successfully registered! Please login!");
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        if (err instanceof HttpErrorResponse) {
          if (err.status == 400) {
            alert("User Details already exists!");
          } else if (err.status == 500) {
            alert("Please provide Username with minimum length of 3, Email id in proper format as abc@gmail.com & Password with minimum length 3 and maximum length 20.")
          } else if(err.status == 200) {
            alert("Successfully registered! Please login!");
            window.location.reload();
          }
        }
      }
    );
  }

  // loginUser() {
  //   console.log(this.userLogin)
  //   this.authService.loginUser(this.userLogin).subscribe(data => {
  //     console.log(data);
  //     if (data == "Success")
  //       this.nextUrl(this.userLogin.username);
  //     else
  //       alert("Invalid Credentials! Please register your user details!");

  //   }, error => {
  //     alert("Invalid Credentials! Please register your user details!");
  //     console.log(error)});
  // }

  loginUser() {
    console.log(this.userLogin)
    this.authService.loginUser(this.userLogin).subscribe(data => {
      console.log(data)
      this.tokenStorage.saveToken(data["accessToken"]);
      this.tokenStorage.saveUser(data);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.nextUrl(this.userLogin.emailId);
    },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        alert("Invalid Credentials! Please register your user details!");
      }
    );
  }

  nextUrl(emailId) {
    console.log(emailId)
    this.router.navigate(["/user/" + emailId + "/flightBooking"]);
  }
}
