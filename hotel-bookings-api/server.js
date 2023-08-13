process.env.PORT = process.env.PORT || 9090;
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
app.get("/bookings", function (request, response) {
  response.send(bookings);
});
app.get("/bookings/:id", function (request, response) {
  let id = Number(request.params.id);
  let booking = bookings.find((booking) => booking.id === id);
  if (booking) {
    response.json(booking);
  } else response.status(404).send("Booking does not exist");
});
app.post("/bookings", function (request, response) {
  let id = bookings[bookings.length - 1].id + 1;
  console.log(id);
  let newBooking = {
    id: id,
    title: request.body.title,
    firstName: request.body.firstName,
    surname: request.body.surname,
    email: request.body.email,
    roomId: request.body.roomId,
    checkInDate: request.body.checkInDate,
    checkOutDate: request.body.checkOutDate,
  };
  if (
    request.body.title &&
    request.body.firstName &&
    request.body.surname &&
    request.body.email &&
    request.body.roomId &&
    request.body.checkInDate &&
    request.body.checkOutDate
  ) {
    bookings.push(newBooking);
    response.json(newBooking);
  } else response.status(404).send("Missing data, please check all fields are filled in");
});
app.delete("/bookings/:id", function (request, response) {
  let id = Number(request.params.id);
  let IndexOfBooking = bookings.findIndex((booking) => booking.id === id);
  if (IndexOfBooking > 0) {
    response.json(bookings.splice(IndexOfBooking, 1));
  } else response.status(404).send("Booking does not exist");
});
// TODO add your routes and helper functions here

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
