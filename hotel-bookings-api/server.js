const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
// const bookings = require("./bookings.json");

app.post("/bookings", function (req, res) {
  fs.readFile("bookings.json", async (err, data) => {
    try {
      const bookings = await JSON.parse(data);
      const bookingId = bookings.map((booking) => {
        return booking.id;
      });
      bookingId.sort((a, b) => b - a);

      const newBooking = {};
      newBooking.id = bookingId[0] + 1;
      newBooking.roomId = req.body.roomId;
      newBooking.title = req.body.title;
      newBooking.firstName = req.body.firstName;
      newBooking.surName = req.body.surName;
      newBooking.email = req.body.email;
      newBooking.checkInDate = req.body.checkInDate;
      newBooking.checkOutDate = req.body.checkOutDate;
      for (let key of Object.keys(newBooking)) {
        if (newBooking.key == "" || newBooking.key == undefined) {
          res.sendStatus(400);
        }
      }
      bookings.push(newBooking);
      fs.writeFile("bookings.json", JSON.stringify(bookings), (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.json("New booking created");
    } catch (err) {
      console.log(err);
    }
  });
});
app.get("/bookings", function (req, res) {
  fs.readFile("bookings.json", async (err, data) => {
    try {
      const bookings = await JSON.parse(data);
      res.json(bookings);
    } catch (err) {
      console.log(err);
    }
  });
});
app.get("/bookings/:id", function (req, res) {
  fs.readFile("bookings.json", async (err, data) => {
    try {
      const bookings = await JSON.parse(data);
      bookings.map((booking) => {
        if (booking.id == req.params.id) {
          res.json(booking);
        }
        res.json("Booking not found. Please enter a valid id!");
      });
    } catch (err) {
      console.log(err);
    }
  });
});
app.delete("/bookings/:id", function (req, res) {
  fs.readFile("bookings.json", async (err, data) => {
    try {
      const bookings = await JSON.parse(data);
      const deletedBooking = bookings.filter(
        (booking) => booking.id == req.params.id
      );
      bookings.filter((booking) => booking.id !== req.params.id);
      if (deletedBooking.length > 0) {
        fs.writeFile("bookings.json", JSON.stringify(bookings), (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.json("Booking deleted successfully.");
      } else {
        res.json("Booking not found.");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
// TODO add your routes and helper functions here

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
