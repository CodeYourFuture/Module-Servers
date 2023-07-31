const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const port = 3000;

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here

// all the bookings
app.get("/bookings", function (request, response) {
  response.send(bookings);
});

// creating new booking
app.post("/bookings", function (request, response) {
  // reject booking if ant object field is empty - simple validation
  
   const booking = request.body;
  if (
    (!booking.name || !booking.title || !booking.
    firstName ||
      !booking.surname ||
      !booking.email ||
      !booking.roomId ||
      !booking.checkInDate ||
      !booking.checkOutDate)
  ) {
    return response.status(400).send("invalid request..missing data");
  }

  let max = bookings.reduce((a, b) => {
    // max items in our array
    return { id: Math.max(a.id, b.id) };
  });
 
  booking.id = max.id + 1; // id will be server generater
  bookings.push(booking); //pushing our new booking into bookings
  response.json({
    data: booking,
    message: "booking created",
  });
});

// getting booking by ID
app.get("/bookings/:id", function (request, response) {
  const bookingId = bookings.find((booking) => booking.id == request.params.id);

  if (!bookingId) {
    response.status(404).send("booking not found");
  } else {
    response.json(bookingId);
  }
});

// delete

app.delete("/bookings/:id", function (request, response) {
  const index = bookings.findIndex(
    (booking) => booking.id == request.params.id
  );
  if (index == -1) {
    response.status(404).send("Booking not found");
  } else {
    bookings.splice(index, 1);
    response.send("Booking deleted");
  }
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
