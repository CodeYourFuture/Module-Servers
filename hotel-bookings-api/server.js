const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); 

const bookingsData = require("./bookings.json");
let nextBookingId = 1;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html"); 
});

app.get("/bookings", function (req, res) {
  res.json(bookingsData);
});

app.get("/bookings/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const booking = bookingsData.find((booking) => booking.id === id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  res.json(booking);
});

app.post("/bookings", function (req, res) {
  const newBooking = req.body;
  if (!isValidBooking(newBooking)) {
    return res.status(400).json({ error: "Invalid booking data" });
  }

  newBooking.id = getNextBookingId();
  bookingsData.push(newBooking);
  res.status(201).json(newBooking);
});

app.delete("/bookings/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const index = bookingsData.findIndex((booking) => booking.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Booking not found" });
  }

  bookingsData.splice(index, 1);
  res.json({ message: "Booking deleted successfully" });
});

function isValidBooking(booking) {
  return (
    booking &&
    booking.roomId &&
    booking.title &&
    booking.firstName &&
    booking.surname &&
    booking.email &&
    booking.checkInDate &&
    booking.checkOutDate
  );
}

function getNextBookingId() {
  const maxId = bookingsData.reduce(
    (acc, booking) => Math.max(acc, booking.id),
    0
  );
  return maxId + 1;
}

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});
