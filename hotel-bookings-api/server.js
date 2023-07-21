const express = require("express");
const { body, validationResult } = require("express-validator");
const moment = require("moment");
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

app.get("/bookings/search", (req, res) => {
  if (req.query.date) {
    const searchDate = req.query.date;
    if (!moment(searchDate, "YYYY-MM-DD").isValid()) {
      return res.status(400).json({
        data: null,
        message: "Invalid date format. Use YYYY-MM-DD.",
      });
    }
    const bookingsForSearchDate = bookings.filter((booking) =>
      moment(searchDate).isBetween(booking.checkInDate, booking.checkOutDate)
    );
    if (bookingsForSearchDate.length === 0) {
      return res.status(404).json({
        data: null,
        message: "There are no bookings for the given date.",
      });
    }
    res.status(200).json({
      data: bookingsForSearchDate,
      message: "Available bookings for the given date",
    });
  } else if (req.query.email) {
    const searchEmail = req.query.email.toLowerCase();
    const bookingsForSearchEmail = bookings.filter(
      (booking) => booking.email.toLocaleLowerCase() === searchEmail
    );
    if (bookingsForSearchEmail.length === 0) {
      return res.status(404).json({
        data: null,
        message: "There are no bookings for the given email.",
      });
    }
    res.status(200).json({
      data: bookingsForSearchEmail,
      message: "Available bookings for the given email",
    });
  } else if (req.query.firstName) {
    const searchFirstName = req.query.firstName.toLowerCase();
    const bookingsForSearchFirstName = bookings.filter(
      (booking) => booking.firstName.toLocaleLowerCase() === searchFirstName
    );
    if (bookingsForSearchFirstName.length === 0) {
      return res.status(404).json({
        data: null,
        message: "There are no bookings for the given firstName.",
      });
    }
    res.status(200).json({
      data: bookingsForSearchFirstName,
      message: "Available bookings for the given firstName",
    });
  } else if (req.query.surname) {
    const searchSurname = req.query.surname.toLowerCase();
    const bookingsForSearchSurname = bookings.filter(
      (booking) => booking.surname.toLocaleLowerCase() === searchSurname
    );
    if (bookingsForSearchSurname.length === 0) {
      return res.status(404).json({
        data: null,
        message: "There are no bookings for the given surname.",
      });
    }
    res.status(200).json({
      data: bookingsForSearchSurname,
      message: "Available bookings for the given surname",
    });
  } else {
    return res.status(400).json({
      data: null,
      message:
        "Yoe can only search based on date, email, firstName and surname and also please input your search content correctly.",
    });
  }
});

app.get("/bookings/:id", (req, res) => {
  const specificBookId = Number(req.params.id);
  const specificBook = bookings.find(
    (booking) => booking.id === specificBookId
  );
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
    const checkInDate = moment(req.body.checkInDate);
    const checkOutDate = moment(req.body.checkOutDate);
    if (checkOutDate.isBefore(checkInDate)) {
      return res.status(400).json({
        data: null,
        message: "CheckOutDate must be after checkInDate",
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
  const deleteBook = bookings.find((booking) => booking.id === deleteBookId);
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
