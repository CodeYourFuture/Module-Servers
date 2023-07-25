const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here
//process.env.PORT
const listener = app.listen(9090, function () {
  console.log("Your app is listening on port ");
});

// 1- Read all bookings

app.get("/booking", function (request, response) {
  response.send(bookings);
});

// 2- Read one booking, specified by an ID
////If the booking to be read cannot be found by id, return a 404.
app.get("/booking/:id", function (request, response) {
  const id = Number(request.params.id);
  const searched = bookings.filter((booking) => booking.id === id);
  if (searched.length < 1) {
    response.status(404).send("id not found");
  } else {
    console.log(searched);
    response.send(searched);
  }
});

//3- Delete a booking, specified by an ID
//If the booking for deletion cannot be found by id, return a 404.
app.delete("/booking/:id", function (request, response) {
  const id = Number(request.params.id);
  const indexToDelete = bookings.findIndex((booking) => booking.id === id);
  if (indexToDelete !== -1) {
    bookings.splice(indexToDelete, 1);
  } else {
    response.status(404).send("id to be deleted not found");
  }
  response.send(bookings);
});

// 4- Create a new booking
app.post("/booking", function (request, response) {
  const body = request.body;
  const newBooking = {
    id: request.body.id,
    title: request.body.title,
    firstName: request.body.firstName,
    surname: request.body.surname,
    email: request.body.email,
    roomId: request.body.roomId,
    checkInDate: request.body.checkInDate,
    checkOutDate: request.body.checkOutDate,
  };

  bookings.push(newBooking);
  response.status(200).send(bookings);
});
