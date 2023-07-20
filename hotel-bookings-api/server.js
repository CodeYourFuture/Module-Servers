const express = require("express");
const { body, validationResult } = require("express-validator");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.json({
    data: "Hotel booking server.  Ask for /bookings, etc.",
    message: "ok",
  });
});

// TODO add your routes and helper functions here

app.get("/bookings", function (request, response) {
  response.json({
    data: bookings,
    message: "ok",
  });
});

app.get("/bookings/:id", (req, res) => {
  const specificBookId = Number(req.params.id);
  const specificBook = bookings.find((book) => book.id === specificBookId);
  if (!specificBook) {
    return res.status(404).json({
      data: null,
      message: "There is no book based on given id",
    });
  }
  res.status(200).json({
    data: specificBook,
    message: "Your desired book has been returned.",
  });
});

app.post(
  "/bookings",
  [
    body("title", "title should not be empty and should be string")
      .notEmpty()
      .isString()
      .trim(),
    body("firstName", "firstName should not be empty and should be string")
      .notEmpty()
      .isString()
      .trim(),
    body("surname", "surname should not be empty and should be string")
      .notEmpty()
      .isString()
      .trim(),
    body("email", "email should not be empty and should be email")
      .notEmpty()
      .isEmail()
      .trim(),
    body("roomId", "roomId should not be empty and should be Number")
      .notEmpty()
      .isInt()
      .trim(),
    body(
      "checkInDate",
      "checkInDate should not be empty and should use this format YYYY-MM-DD"
    )
      .notEmpty()
      .isDate({ format: "YYYY-MM-DD" })
      .trim(),
    body(
      "checkOutDate",
      "checkOutDate should not be empty and should use this format YYYY-MM-DD"
    )
      .notEmpty()
      .isDate({ format: "YYYY-MM-DD" })
      .trim(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "Validation error",
      });
    }
    bookings.push({
      id: bookings.length + 1,
      ...req.body,
      roomId: Number(req.body.roomId),
    });
    res.status(201).json({
      data: bookings,
      message: "The new book has been added.",
    });
  }
);

app.delete("/bookings/:id", (req, res) => {
  const deleteBookId = Number(req.params.id);
  const deleteBook = bookings.find((book) => book.id === deleteBookId);
  if (!deleteBook) {
    return res.status(404).json({
      data: null,
      message: "There is no book to delete based on given id",
    });
  }
  const deleteBookIndex = bookings.indexOf(deleteBook);
  bookings.splice(deleteBookIndex, 1);
  res.status(200).json({
    data: bookings,
    message: "The book has been deleted.",
  });
});

// const listener = app.listen(process.env.PORT, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });
const listener = app.listen(57542, function () {
  console.log("Your app is listening on port 57542 ");
});
