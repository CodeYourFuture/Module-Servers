const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

app.post("/bookings", function (req, res) {
  const newBooking = req.body;
  const bookingId = generateUniqueId();
  newBooking.id = bookingId;
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

app.get("/bookings", function (req, res) {
  res.json(bookings);
});

app.get("/bookings/:id", function (req, res) {
  const bookingId = req.params.id;
  const booking = bookings.find((b) => b.id === bookingId);
  if (!booking) {
    res.status(404).json({ error: "Booking not found" });
  } else {
    res.json(booking);
  }
});

app.delete("/bookings/:id", function (req, res) {
  const bookingId = req.params.id;
  const index = bookings.findIndex((b) => b.id === bookingId);
  if (index === -1) {
    res.status(404).json({ error: "Booking not found" });
  } else {
    bookings.splice(index, 1);
    res.sendStatus(204);
  }
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
