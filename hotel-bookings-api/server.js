const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", (req, res) => {
  res.send("Hotel booking server.  Ask for /bookings, etc.");
});

// Get all bookings
app.get("/bookings", (req, res) => {
  res.json(bookings);
});

// Create a new booking
app.post("/bookings", (req, res) => {
  const newBooking = {
    id: bookings[bookings.length - 1].id + 1,
    roomId: req.body.roomId,
    title: req.body.title,
    firstName: req.body.firstName,
    surname: req.body.surname,
    email: req.body.email,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
  };
  bookings.push(newBooking);
  if (
    !newBooking.roomId ||
    newBooking.roomId === "" ||
    !newBooking.title ||
    newBooking.title === "" ||
    !newBooking.firstName ||
    newBooking.firstName === "" ||
    !newBooking.surname ||
    newBooking.surname === "" ||
    !newBooking.email ||
    newBooking.email === "" ||
    !newBooking.checkInDate ||
    newBooking.checkInDate === "" ||
    !newBooking.checkOutDate ||
    newBooking.checkOutDate === ""
  ) {
    res.status(400).send("Invalid booking");
  }
});

// Get a booking by id
app.get("/bookings/:id", (req, res) => {
  const id = req.params.id;
  const booking = bookings.find((booking) => booking.id == id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).send("Booking not found");
  }
});

// Delete a booking by id
app.delete("/bookings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index !== -1) {
    bookings.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

const listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
