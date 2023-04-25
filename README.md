## Air Ticket Booking

- `/api/register`  
  this is a POST method endpoint where user can enter the details and register with the Air ticket booking system.
  the data model of this endpoint is :
```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String
 }
```
the status code of scuccessful response is 201

- `/api/login`
  this is a POST method where user can login into the system and get athenticated to perform differect functionalities.Even though it is POST we are checking the credentials are matching and giving user a valid token.
  the data model of this endpoinr is :
```
  email: String,
  password: String
```
the status code of scuccessful response is 201

- `/api/flights`
  This endpoint will return a list of all available flights.
  No authentication is needed to access this endpoint.
  This is a GET method.
the status code of scuccessful response is 200.

- `/api/flights/:id`
  this endpoint will return the details of a specific flight identified by its ID.This is GET method.
 the status code of scuccessful response is 200.

- `/api/flights`
  This is a POST method,
  This endpoint will allow logged in users to add new flights to the system.
```
{
  _id: ObjectId,
  airline: String,
  flightNo: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  seats: Number,
  price: Number,
  userID:String
}
```
 the status code of scuccessful response is 201.

- `/api/flights/:id`
  This is PATCH method,
  This endpoint will allow users who created the flight to update the details of a specific flight identified by its ID.
 the status code of scuccessful response is 204.

- `/api/flights/:id`
  This is DELETE method,
    This endpoint will allow users who created the flight to delete the details of a specific flight identified by its ID.
 the status code of scuccessful response is 202.

- `/api/booking`
  This is a POST method,
  This endpoint will allow logged in users to book any particular flight.
```
{
	 _id: ObjectId,
	 user : { type: ObjectId, ref: 'User' },
	 flight : { type: ObjectId, ref: 'Flight' }
}

```
 the status code of scuccessful response is 201.


- `/api//api/dashboard`
  This is GET method,
  This endpoint will list all the bookings so far with the logged in user and flight details.
the status code of scuccessful response is 200.