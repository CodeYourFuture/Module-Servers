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
//Create a new booking
app.post("/bookings", function (request, response) {
  const newBooking = request.body;
  bookings.push(newBooking);
  response.send(newBooking);
});
//Read all bookings
app.get("/bookings", function (request, response) {
  response.send({ bookings });
});
//Read one booking by  id
app.get("/bookings/:id", function (request, response) {
  const bookingIdToFind = request.params.id;
  const bookingToFind = bookings.find(
    (booking) => booking.id === Number(bookingIdToFind)
  );
  if (bookingToFind) {
    response.send(bookingToFind);
  } else {
    response.status(404).send();
  }
});
//Delete a booking by Id
app.delete("/bookings/:id", function (request, response) {
  const bookingIdToDelete = request.params.id;
  const bookingToDeleteIndex = bookings.findIndex(
    (booking) => booking.id === Number(bookingIdToDelete)
  );
  if (bookingToDeleteIndex != -1) {
    bookings.splice(bookingToDeleteIndex, 1);
    response.status(200).send("Booking has been deleted");
  } else {
    response.status(404).send();
  }
});
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
