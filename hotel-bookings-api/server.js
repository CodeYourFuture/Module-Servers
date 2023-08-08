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

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
