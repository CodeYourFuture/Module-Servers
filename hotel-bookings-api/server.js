const express = require("express");
const cors = require("cors");

const app = express();
const validator = require("email-validator"); //level 4
const moment = require("moment");

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here
const port = process.env.PORT || 4002;

//level 1
app.get("/bookings", (req, res) => {
  res.json(bookings);
});

app.post("/bookings", (req, res) => {
  const newBooking = {
    id: bookings.length + 1,
    title: req.body.titl,
    firstName: req.body.firstName,
    surname: req.body.surname,
    email: req.body.email,
    roomId: req.body.roomId,
    checkInDate: req.body.checkInDate,
    checkOutDat: req.body.checkOutDat,
  };
  //email validation
/*   var now = moment(new Date());
  end = moment(fd);
  days = end.diff(now, "days"); */
  let a = moment(newBooking.checkInDate);
  let b = moment(newBooking.checkOutDat)
  if (validator.validate(newBooking.email) && b.diff(a, "days") > 0) {
    bookings.push(newBooking);
    res.json(bookings);
  } else {
    res.send("unvalid email");
  }
});

//
app.get("/bookings/search", (req, res) => {
  const searchDate = req.query.date;
  const filteredDate = bookings.filter(
    (m) => m.checkInDate === searchDate || m.checkOutDate === searchDate
  );

  if (filteredDate) {
    res.send(filteredDate);
  } else {
    res.send("Bookings not found with the date");
  }
});

app.get("/bookings/:id", (req, res) => {
  const id = req.params.id;
  const booking = bookings.find((booking) => booking.id == id);
  if (!booking) {
    return res.status(404).json({
      status: "failed",
      message: "No booking obj with ID " + id + " is found",
    });
  }
  res.json(booking);
});

app.delete("/bookings/:id", (req, res) => {
  const id = req.params.id;
  const deletedBooking = bookings.find((booking) => booking.id == id);
  if (!deletedBooking) {
    return res.status(404).json({
      status: "failed",
      message: "No booking obj with ID " + id + " is found",
    });
  }
  const index = bookings.indexOf(deletedBooking);
  bookings.splice(index, 1);
});

//listen
const listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});