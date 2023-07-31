process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json()); // needed to parse JSON data
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

let bookingIdCounter = 6; // How do I start this from last object id from json?

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

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

  if (
    newBooking.title.length === 0 || // could also use !newBooking.title etc.
    newBooking.firstName.length === 0 ||
    newBooking.surname.length === 0 ||
    newBooking.email.length === 0 ||
    newBooking.roomId.length === 0 ||
    newBooking.checkInDate.length === 0 ||
    newBooking.checkOutDate.length === 0
  ) {
    response.status(400).json({
      error: "Booking not created",
    });
  } else {
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
  }
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
