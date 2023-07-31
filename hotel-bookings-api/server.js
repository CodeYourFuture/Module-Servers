const express = require("express");
const {body, validationResult} = require('express-validator');
const fs = require("fs");
const bookings = JSON.parse(fs.readFileSync("./bookings.json"));
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
// const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// show all bookings
app.get("/api/hotel/booking", (req, res) => {
  res.send(bookings);
});

// TODO add your routes and helper functions here

const validationData = [
  body("title").trim().notEmpty(),
  body("firstName")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("First Name must be at less 3 characters"),
  body("surname")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Surname must be at less 3 characters"),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .toLowerCase()
    .normalizeEmail()
    .withMessage("Email must be a valid email"),
  body("roomId").trim().notEmpty().isNumeric(),
  body("checkInDate").trim().notEmpty(),
  body("checkOutDate").trim().notEmpty(),
];

//post
app.post("/api/hotel/booking", validationData, (req, res) => {

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  };

  const newId = bookings[bookings.length - 1].id + 1;
  const {
    title,
    firstName,
    surname,
    email,
    roomId,
    checkInDate,
    checkOutDate,
  } = req.body;

  const newBooking = Object.assign({ id: newId }, req.body);

  bookings.push(newBooking);
  fs.writeFile("./bookings.json", JSON.stringify(bookings), () => {
    res.status(201).send({
      bookings: {
        newBooking,
      },
    });
  });
});

// find by ID
app.get("/api/hotel/booking/:id", (req, res) => {
  const getById = Number(req.params.id);
  const findBookingById = bookings.find((book) => book.id === getById);
  if (!findBookingById)
    return res
      .status(404)
      .send(`message: booking for ID requested is not found`);
  res.status(200).send(findBookingById);
});

// Delete
app.delete("/api/hotel/booking/:id", (req, res) => {
  const getById = Number(req.params.id);
  const deleteBookingById = bookings.find((book) => book.id === getById);
  const index = bookings.indexOf(deleteBookingById);

  if (!deleteBookingById)
    return res
      .status(404)
      .send(`message: booking for ID requested is not found`);

  bookings.splice(index, 1);

  fs.writeFile("./bookings.json", JSON.stringify(bookings), () => {
    res.status(200).send({
      bookings: {
        Message: "Booking with id has been deleted successfully",
      },
    });
  });
});

const port = process.env.PORT || 5099;
app.listen(port, () => console.log(`listen on port ${port} .....!!`));
