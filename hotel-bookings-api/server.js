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

// TODO add your routes and helper functions here

// create a new booking

app.post("/bookings/", function(request, response) {
  console.log("this is the data the client sent over --->", request.body);
  const newBooking = request.body;
  bookings.push(newBooking);
  response.status(201).send({ newBooking });
});

// get all bookings

app.get("/bookings", function (request, response) {
  response.json(bookings);
});

// get one booking, specified by an ID

app.get("/bookings/:id", function (request, response) {
  const bookingIdToFind = Number(request.params.id);
  const bookingWithMatchingId = bookings.find((booking) => booking.id === bookingIdToFind);
  console.log(bookingWithMatchingId);
  if (bookingWithMatchingId === undefined) {
    console.log("error")
    response.status(404).send("ID not found");
  } else {
    response.send({ bookingWithMatchingId });
  }
});

// delete a booking, specified by an ID

app.delete("/bookings/:id", function (request, response) {
  const bookingId = Number(request.params.id);
  const bookingWithMatchingId = bookings.find((booking) => booking.id === bookingId);
  console.log(bookingWithMatchingId);
  if (bookingWithMatchingId === undefined) {
    console.log("error");
    response.status(404).send("ID not found");
  } else {
    const bookingIndexToBeDeleted = bookings.indexOf(bookingWithMatchingId);
    bookings.splice(bookingIndexToBeDeleted, 1);
    console.log(bookingIndexToBeDeleted);
    response.status(200).send({ success: true });
  }
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
