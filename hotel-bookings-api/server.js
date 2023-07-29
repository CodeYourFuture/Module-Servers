const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

app.get("/bookings", (req, res) => {
  res.send(bookings)
})

app.post("/bookings", (req, res) => {
  let newBooking = req.body
  if (newBooking.title === "" || newBooking.firstName === "" || newBooking.surname === "" || newBooking.email === "" || newBooking.roomId === "" || newBooking.checkInDate === "" || newBooking.checkOutDate === "") {
    bookings && bookings.push(newBooking)
    res.send(newBooking)
  } else {
    res.status(400).send("Didn't store the booking in the bookings array");
  }

})

app.get("/bookings/:id", (req, res) => {
  let bookingID = req.params.id
  let singleBooking = bookings.filter(booking => {
    return booking.id === Number(bookingID)
  })
  if (singleBooking.length === 0) {
    res.status(404).send("Not found. 404");
  } else {
    res.send(singleBooking)
  }
})

app.delete("/bookings/:id", (req, res) => {
  let givenId = req.params.id
  res.send(deleteBookingID(bookings, givenId))
})

// TODO add your routes and helper functions here

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});


const deleteBookingID = (bookings, id) => {
  let bookingInd = bookings.findIndex((booking) => booking.id == id);

  if (bookingInd > -1) {
    bookings.splice(bookingInd, 1);
  }
  return bookings;
}
