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

// Get all bookings
app.get("/bookings", function (request, response) {
  response.json({ bookings });
});

// Get one booking, specified by an ID
app.get("/bookings/:id", function (request, response) {
const newBookingId = parseInt(request.params.id)
if (isNaN(newBookingId)) {
  response.status(404).send
}else{
const findById = bookings.find((booking) => newBookingId === booking.id)
response.json({findById})
}
});

// 1. Create a new booking

app.post("/bookings", function (request, response) {
  let newBooking = request.body;
  bookings.push(newBooking);
  response.status(201).send({ newBooking });
});


// 1. Delete a booking, specified by an ID
app.delete("/bookings/:id", function (request, response) {});



const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
