import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AirlineRegistrationComponent } from './airline-registration/airline-registration.component';
import { AirlineComponent } from './airline/airline.component';
import { EditAirlineComponent } from './edit-airline/edit-airline.component';
import { FlightbookingComponent } from './flightbooking/flightbooking.component';
import { HomeComponent } from './home/home.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { ViewAirlineComponent } from './view-airline/view-airline.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';


const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'user', component: UserloginComponent },
  { path: 'user/:id1/flightBooking', component: FlightbookingComponent },
  { path: 'user/:id1/flightBooking/view', component: ViewBookingComponent },
  { path: 'admin', component: AdminloginComponent },
  { path: 'admin/view', component: ViewAirlineComponent },
  { path: 'admin/register', component: AirlineRegistrationComponent},
  { path: 'admin/edit/:id2', component: EditAirlineComponent},
  { path: 'admin/registerAirline', component: AirlineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
