const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

///1. Create a new booking
// app.post("/booking", function (request, response) {
//   const addID = bookings[bookings.length - 1].id + 1;
//   const newBooking = Object.assign({ id: addID }, request.body);
//   bookings.push(newBooking);
//     response.status(200).json({ message: "Booking created successfully", data: newBooking });

// });
///1. Create a new booking
// app.post("/booking", function (request, response) {
//   const addID = bookings[bookings.length - 1].id + 1;
//   const newBooking = Object.assign({ id: addID }, request.body);
//   bookings.push(newBooking);
//   response
//     .status(200)
//     .json({ message: "Booking created successfully", data: newBooking });
// });
app.post("/bookings", (request, response) => {
  const bookinglist = [
    "title",
    "firstName",
    "surname",
    "email",
    "roomId",
    "checkInDate",
    "checkOutDate",
  ];
  const missingList = bookinglist.filter((prop) => !request.body[prop]);
  if (missingList.length > 0) {
    return response
      .status(400)
      .json({ error: "Missing or empty properties in the request." });
  }

  const newBooking = {
    id: bookings[bookings.length - 1].id + 1,
    ...request.body,
  };
  bookings.push(newBooking);
  response.status(200).json(newBooking);
});

//////////////////
app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// Read all bookings
app.get("/bookings", function (request, response) {
  response.status(200).json({ date: bookings });
});
// Read one booking, specified by an ID
app.get("/bookings/:id", function (request, response) {
  const ShowID = request.params.id * 1;
  const bookingById = bookings.find((ele) => ele.id === ShowID);
  if (bookingById) {
    response.status(200).json(bookingById);
  } else {
    response.status(404).json({ message: "somthing went wrong" });
  }
});

// Delete a booking, specified by an ID
app.delete("/bookings/:id", function (request, response) {
  const ShowID = request.params.id * 1;
  const bookingById = bookings.findIndex((ele) => ele.id === ShowID);

  if (bookingById !== -1) {
    bookings.splice(bookingById, 1);
    response
      .status(200)
      .json({ message: "Booking deleted successfully", date: bookingById });
  } else {
    response.status(404).json({ message: "Booking not found" });
  }
});

// TODO add your routes and helper functions here

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
