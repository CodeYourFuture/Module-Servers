process.env.PORT = process.env.PORT || 3001;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

//se this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});
app.get("/bookings", function (req, res) {
  res.send({ bookings });
});
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
    req.body.email &&
    req.body.checkInDate &&
    req.body.checkOutDate
  ) {
    bookings.push(booking);
    res.status(200).json(booking);
  } else res.status(404).send("Please check the fields have been correctly filled in");
});
app.get("/bookings/:id", function (req, res) {
  const id = Number(req.params.id);
  const filteredBooking = bookings.filter((booking) => booking.id === id);
  if (filteredBooking.length > 0) {
    res.send(filteredBooking);
  } else {
    res.status(404).send("Please check ID number");
  }
});
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
