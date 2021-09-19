import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './service/HttpService.service';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { FlightbookingComponent } from './flightbooking/flightbooking.component';
import { AirlineRegistrationComponent } from './airline-registration/airline-registration.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { EditAirlineComponent } from './edit-airline/edit-airline.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminloginComponent,
    UserloginComponent,
    FlightbookingComponent,
    AirlineRegistrationComponent,
    ViewBookingComponent,
    EditAirlineComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
