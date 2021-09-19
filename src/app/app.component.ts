import { Component, OnInit } from '@angular/core';
import { HttpService } from './service/HttpService.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Flight Booking Application';

  constructor(private http:HttpService){}
  
  ngOnInit() {
    // this.demo.getMethod().subscribe(
    //  response =>{console.log(response)}
    // );
  }
}
