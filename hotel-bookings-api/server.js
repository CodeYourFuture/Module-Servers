process.env.PORT = process.env.PORT || 3030;
const express = require("express");
const cors = require("cors");
const moment = require("moment");
const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

app.get("/bookings", function (request, response) {
  response.status(200).json(bookings);
});

app.get("/bookings/:id", function (request, response) {
  const idRead = request.params.id * 1;
  const booking = bookings.find((el) => el.id === idRead);
  response.status(200).json({ booking });
});

app.get("/bookings/search", (request, response) => {

  const checkDate = request.query.date;
  let bookingDate = bookings.filter((booking) => {
    return moment(checkDate).isBetween(booking.checkInDate, booking.checkOutDate);
  });

  try {
    response.json({ bookingDate });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/bookings", (request, response) => {
  const bookingProps = ["title", "firstName", "surname", "email", "roomId", "checkInDate", "checkOutDate"];
  const missingProps = bookingProps.filter((prop) => !request.body[prop]);
  if (missingProps.length > 0) {
    return response.status(400)
    .json({ error: "Missing or empty properties in the request." });
  }

  const newBooking = {
    id: bookings[bookings.length - 1].id + 1,
    ...request.body,
  };
  bookings.push(newBooking);
  response.status(200).json(newBooking);
});

app.delete("/bookings/:id", function (request, response) {
  const idRead = request.params.id * 1;
  const booking = bookings.find((el) => el.id === idRead);
  response.status(200).json({
    booking,
  });
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
