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
app.get("/bookings", function (request, response) {
  response.json(bookings); 
});

app.post("/bookings", (request, response) => {
  const bookingProperty = ["title", "firstName", "surname", "email", "roomId", "checkInDate", "checkOutDate"];
  const missingProperty = bookingProperty.filter((property) => !request.body[property]);
  
  if (missingProperty.length > 0) {
    return response.status(400).json({ error: "Missing or empty properties in the request." });
  }

  const newBooking = request.body;
  bookings.push(newBooking);
  response.status(201).json(newBooking);
});

app.get("/bookings/:id", function (request, response) {
  const bookingId = parseInt(request.params.id);
  const booking = bookings.find((booking) => booking.id === bookingId);

  if (booking) {
    response.json(booking);
  } else {
    response.status(404).json({ error: "Booking not found" });
  }
});


app.delete("/bookings/:id", function (request, response) {
  const bookingId = parseInt(request.params.id);
  const index = bookings.findIndex((booking) => booking.id === bookingId);

  if (index !== -1) {
    bookings.splice(index, 1);
    response.status(204).send(); 
  } else {
    response.status(404).json({ error: "Booking not found" });
  }
});



const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
