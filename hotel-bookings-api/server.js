const express = require("express");
const cors = require("cors");
process.env.PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/bookings", function (request, response) {
  response.send(bookings);
});

app.post("/bookings/:id", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const firstName = req.body.firstName;
  const surname = req.body.surname;
  const email = req.body.email;
  const roomId = req.body.roomId;
  const checkInDate = req.body.checkInDate;
  const checkOutDate = req.body.checkOutDate;
  if (
    (id != undefined) &
    (title != undefined) &
    (firstName != undefined) &
    (surname != undefined) &
    (email != undefined) &
    (roomId != undefined) &
    (checkInDate != undefined) &
    (checkOutDate != undefined)
  ) {
    bookings.push(req.body);
    res.status(200).send(bookings);
  } else {
    res.status(404).send();
  }
});

app.get("/bookings/:id", (req, res) => {
  const id = Number(req.params.id);
  const booking = bookings.find((booking) => booking.id === id);
  booking != null
    ? res.status(200).send(booking)
    : res.status(404).send("Booking not found");
});
