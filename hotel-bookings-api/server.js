const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const validator = require("validator");

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

app.get("/bookings/search", (req, res) => {
  const date = req.query.date;
  console.log("Queried date: ", date);

  if (!date) {
    return res.status(400).send("Missing date in query");
  }

  const bookingsOnDate = bookings.filter((booking) => {
    const checkInDate = moment(booking.checkInDate, "YYYY-MM-DD");
    const checkOutDate = moment(booking.checkOutDate, "YYYY-MM-DD");
    const queriedDate = moment(date, "YYYY-MM-DD");

    console.log("Check in date: ", checkInDate.format("YYYY-MM-DD"));
    console.log("Check out date: ", checkOutDate.format("YYYY-MM-DD"));
    console.log("Queried date: ", queriedDate.format("YYYY-MM-DD"));

    return queriedDate.isBetween(checkInDate, checkOutDate, null, "[]");
  });

  console.log("Bookings on date: ", bookingsOnDate);

  if (bookingsOnDate.length === 0) {
    return res.status(404).send("No bookings found for this date");
  }

  return res.status(200).json(bookingsOnDate);
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
  const {
    title,
    firstName,
    surname,
    email,
    roomId,
    checkInDate,
    checkOutDate,
  } = booking;

  if (
    !title ||
    !firstName ||
    !surname ||
    !email ||
    !roomId ||
    !checkInDate ||
    !checkOutDate
  ) {
    res
      .status(400)
      .send("Invalid booking. Some properties are missing or empty");
    return;
  }

  // email validation
  if (!validator.isEmail(email)) {
    res.status(400).send("Invalid booking. Email is not valid");
    return;
  }

  // date validation
  const checkIn = moment(checkInDate, "YYYY-MM-DD");
  const checkOut = moment(checkOutDate, "YYYY-MM-DD");
  if (!checkOut.isAfter(checkIn)) {
    res
      .status(400)
      .send("Invalid booking. Checkout date must be after checkin date");
    return;
  }

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
