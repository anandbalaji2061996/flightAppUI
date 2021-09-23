export class BookingDetailsDisplay{
      public pnr:string
      public name:string
      public emailId:string
      public numberOfSeats:string
      public passengerDetails:PassengerDetails[]
      public seatType:string
      public mealOption:string
      public seatnos:string
      public dateofTravel:string
      public ticketCost:string
  }
  
  export class PassengerDetails {
    name: string
    gender: string
    age: string
  }