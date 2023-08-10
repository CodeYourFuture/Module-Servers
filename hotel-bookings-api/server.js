process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

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

app.post("/bookings", function (request, response) {
  // const newBooking = { id: uuidv4(), ...request.body };
  const newBooking = request.body;
  const values = Object.values(newBooking);
    if (values.includes("") || values.includes(null)) {
      response.status(400).send("Please enter missing information")
    } else {
      bookings.push(newBooking);
      response.status(201).send({ newBooking });
    }
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
