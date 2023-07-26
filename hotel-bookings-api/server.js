const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here

app.get("/bookings", (req, res) => {
  res.status(200).json(bookings);
});

app.get("/bookings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const booking = bookings.find((b) => b.id === id);

  if (booking) {
    res.status(200).json(booking);
  } else {
    res.status(404).send("Booking not found");
  }
});

app.post("/bookings", (req, res) => {
  const booking = req.body;
  booking.id = bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 1;
  bookings.push(booking);

  res.status(201).json(booking);
});

app.delete("/bookings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex((b) => b.id === id);

  if (index !== -1) {
    bookings.splice(index, 1);
    res.status(200).send("Booking deleted");
  } else {
    res.status(404).send("Booking not found");
  }
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
