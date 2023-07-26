process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json()); // needed to parse JSON data
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

// At this first level, your API must allow a client to:
//  POST -> Create a new booking
//  GET -> Read all bookings
//  GET -> Read one booking, specified by an ID
//  DELETE -> Delete a booking, specified by an ID

// If the booking to be read cannot be found by id, return a 404.
// If the booking for deletion cannot be found by id, return a 404.
// All booking content should be passed as JSON.

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here

app.get("/bookings", function (request, response) {
  response.json(bookings);
});

app.get("/bookings/:id", function (request, response) {
  let selectedBooking = bookings.filter(
    (booking) => booking.id === Number(request.params.id)
  );
  response.status(404).json(selectedBooking);
});

app.post("/bookings", function (request, response) {
  let newBooking = request.body;
  newBooking.id = bookingIdCounter++; // increment booking id number

  bookings.push({
    id: newBooking.id,
    title: newBooking.title,
    firstName: newBooking.firstName,
    surname: newBooking.surname,
    email: newBooking.email,
    roomId: newBooking.roomId,
    checkInDate: newBooking.checkInDate,
    checkOutDate: newBooking.checkOutDate,
  });
  response.status(201).send(newBooking);
});

app.delete("bookings/:id", function (request, response) {
  let bookingIdDelete = Number(request.params.id);
  const bookingIndex = bookings.findIndex(({ id }) => id === bookingIdDelete);
  if (bookingIndex >= 0) {
    bookings.splice(bookingIndex, 1);
    response.json(bookings);
  } else {
    response.status(404).json({ message: "Booking not found." });
  }
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
