import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const AUTH_API = 'http://3.130.139.9:8091/api1/auth/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class UserDetails {
    constructor(
      public username: string,
      public email: string,
      public password: string
    ) { }
  }

  export class UserLoginCredentials {
    constructor(
      public emailId: string,
      public password: string
    ) { }
  }


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  loginUser(userLoginDetails: UserLoginCredentials) {
    return this.http.post(AUTH_API + 'login', userLoginDetails, httpOptions);
  }

  registerUser(userDetails: UserDetails) {
    return this.http.post(AUTH_API + 'register', userDetails, httpOptions);
  }
}