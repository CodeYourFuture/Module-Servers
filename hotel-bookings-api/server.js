const express = require("express");
const cors = require("cors");
const moment = require('moment');

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

  let a = moment(newBooking.checkOutDate)
  let b = moment(newBooking.checkInDate)

  const emailToValidate = newBooking.email;
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!moment(a).isAfter(b)) {
    res.status(400).send("Check out date should be after Check in date");
  } else if (emailRegexp.test(emailToValidate) == false) {
    res.status(400).send("Please provide a valid email address.")
  } else if (newBooking.title === "" || newBooking.firstName === "" || newBooking.surname === "" || newBooking.email === "" || newBooking.roomId === "" || newBooking.checkInDate === "" || newBooking.checkOutDate === "" ||
    !newBooking.title || !newBooking.firstName || !newBooking.surname || !newBooking.email || !newBooking.roomId || !newBooking.checkInDate || !newBooking.checkOutDate
  ) {
    res.status(400).send("Didn't store the booking in the bookings array");
  } else {
    bookings && bookings.push(newBooking)
    res.send(newBooking)
  }
})

app.get("/bookings/search", (req, res) => {
  let searchDate = req.query.date
  let searchTheName = req.query.term

  if (searchDate) {
    let singleDate = bookings.filter(booking => {
      return moment(searchDate).isBetween(booking.checkInDate, booking.checkOutDate);
    })
    res.send(singleDate)
  } else if (searchTheName) {
    let singleName = bookings.filter(booking => {
      return booking.email.toLowerCase().includes(searchTheName.toLowerCase())
        || booking.firstName.toLowerCase().includes(searchTheName.toLowerCase())
        || booking.surname.toLowerCase().includes(searchTheName.toLowerCase())
    })
    res.send(singleName)
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

// function for deleting
const deleteBookingID = (bookings, id) => {
  let bookingInd = bookings.findIndex((booking) => booking.id == id);

  if (bookingInd > -1) {
    bookings.splice(bookingInd, 1);
  }
  return bookings;
}
