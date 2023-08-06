process.env.PORT = process.env.PORT || 3001;
const express = require("express");
const moment = require("moment");
var validator = require("email-validator");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// Read all bookings

app.get("/bookings", function (req, res) {
  res.status(200).json({ bookings });
});

//Create a new booking

app.post("/bookings", function (req, res) {
  const newId = bookings.length + 1;
  const booking = {
    id: newId,
    roomId: req.body.roomId,
    title: req.body.title,
    firstName: req.body.firstName,
    surname: req.body.surname,
    email: req.body.email,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
  };
  if (
    req.body.roomId &&
    req.body.title &&
    req.body.firstName &&
    req.body.surname &&
    validator.validate(req.body.email) &&
    moment(req.body.checkInDate, "YYYY-MM-DD").isValid() &&
    moment(req.body.checkOutDate, "YYYY-MM-DD").isValid()
  ) {
    bookings.push(booking);
    res.status(200).json(booking);
  } else res.status(404).send("Please check the fields have been correctly filled in");
});

//Search by Date and Term

app.get("/bookings/search", function (req, res) {
  const date = moment(req.query.date, "YYYY-MM-DD", true);
  const searchItem = req.query.term;
  if (date.isValid()) {
    const searchBookings = bookings.filter(
      (booking) =>
        moment(booking.checkInDate) <= date &&
        date <= moment(booking.checkOutDate)
    );
    if (searchBookings.length > 0) {
      res.status(200).json(searchBookings);
    } else {
      res.send("No match Found");
    }
  } else if (searchItem) {
    const searchBookings = bookings.filter(
      (booking) =>
        booking.firstName
          .toLocaleLowerCase()
          .includes(searchItem.toLocaleLowerCase()) ||
        booking.surname
          .toLocaleLowerCase()
          .includes(searchItem.toLocaleLowerCase()) ||
        booking.email
          .toLocaleLowerCase()
          .includes(searchItem.toLocaleLowerCase())
    );
    if (searchBookings.length > 0) {
      res.status(200).json(searchBookings);
    } else {
      res.send("No match Found");
    }
  } else {
    res.status(404).send("Invalid input data.");
  }
});

//Read one booking, specified by an ID

app.get("/bookings/:id", function (req, res) {
  const id = Number(req.params.id);
  const filteredBooking = bookings.filter((booking) => booking.id === id);
  if (filteredBooking) {
    res.status(200).json(filteredBooking);
  } else {
    res.status(404).send("Please check ID number");
  }
});

//Delete a booking, specified by an ID

app.delete("/bookings/:id", function (req, res) {
  const id = Number(req.params.id);
  const bookingID = bookings.findIndex((booking) => booking.id === id);
  if (bookingID > 0) {
    bookings.splice(bookingID, 1);
    res.status(200).send("booking successfully deleted");
  } else {
    res.status(404).send("Please check ID number");
  }
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
