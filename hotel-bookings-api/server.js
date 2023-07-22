const express = require("express");
const cors = require("cors");
const fs = require("fs");
const moment = require("moment");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here

const saveBookingsToFile = () => {
  fs.writeFileSync("./bookings.json", JSON.stringify(bookings, null, 2));
};

const findBookingById = (id) => {
  return bookings.find((booking) => booking.id === id);
};

// Create a new booking
// app.post("/bookings", (req, res) => {
//   const newBooking = req.body;
//   newBooking.id = bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 1;
//   bookings.push(newBooking);
//   saveBookingsToFile();
//   res.json(newBooking);
// });

app.post("/bookings", (req, res) => {
  const newBooking = req.body;

  // Check if any property of the booking object is missing or empty
  if (
    !newBooking.roomId ||
    !newBooking.title ||
    !newBooking.firstName ||
    !newBooking.surname ||
    !newBooking.email ||
    !newBooking.checkInDate ||
    !newBooking.checkOutDate
  ) {
    return res
      .status(400)
      .json({ error: "All booking properties are required." });
  }

  // Check if any property of the booking object is an empty string
  for (const prop in newBooking) {
    if (
      typeof newBooking[prop] === "string" &&
      newBooking[prop].trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "All booking properties must have a value." });
    }
  }

  newBooking.id =
    bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 1;
  bookings.push(newBooking);
  saveBookingsToFile();
  res.json(newBooking);
});

// Read all bookings
app.get("/bookings", (req, res) => {
  res.json(bookings);
});

// Read one booking specified by an ID
app.get("/bookings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const booking = findBookingById(id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found." });
  }
  res.json(booking);
});

// Delete a booking specified by an ID
app.delete("/bookings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Booking not found." });
  }
  bookings.splice(index, 1);
  saveBookingsToFile();
  res.json({ message: "Booking deleted successfully." });
});

app.get("/bookings/search", (req, res) => {
  const searchDate = req.query.date;

  // Validate the date format (YYYY-MM-DD) using Moment.js
  if (!moment(searchDate, "YYYY-MM-DD", true).isValid()) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Please use YYYY-MM-DD." });
  }

  // Filter bookings that span the given date
  const filteredBookings = bookings.filter((booking) =>
    moment(searchDate).isBetween(
      booking.checkInDate,
      booking.checkOutDate,
      null,
      "[]"
    )
  );

  res.json(filteredBookings);
});

const PORT = 2020;
app.listen(PORT, function () {
  console.log("Server is listening on port 2020.....");
});
