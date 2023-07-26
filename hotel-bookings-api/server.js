const express = require("express");
const cors = require("cors");

const app = express();
 const { body, validationResult } = require("express-validator");
app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});
//read all booking
app.get("/bookings",function (req,res){
  if(bookings.length===0){
    return res.status(404).json({
      error:"there is no bookings"
    })
  }
res.json({bookings}); 
})

//create new booking
app.post(
  "/bookings",
  [
    body("title").notEmpty(),
    body("firstName","the firstName shouldn't empty").notEmpty(),
    body("surname","the surname shouldn't empty").notEmpty(),
    body("email","the email should be in a correct format").isEmail(),
    body("email","the email shouldn't empty").notEmpty(),
    body("id").notEmpty(),
    body("roomId").notEmpty(),
    body("checkInDate").notEmpty(),
    body("checkOutDate").notEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({
        error: errors.array()
      });
    }
    bookings.push(req.body);
    res.json({ bookings });
  }
);

//Read one booking, specified by an ID
app.get("/bookings/:id",function (req,res) {
  const choosedBooking = bookings.find(booking=>booking.id == req.params.id);
  if(!choosedBooking){
    return res.status(404).json({
      error:"booking with this id wasn't found"
    })
  }
  res.json({choosedBooking});
})

//Delete a booking, specified by an ID
app.delete("/bookings/:id",function (req,res) {
  const choosedBooking = bookings.find(
    (booking) => booking.id == req.params.id
  );
  if (!choosedBooking) {
    return res.status(404).json({
      error: "booking with this id wasn't found",
    });
  }
  const index = bookings.indexOf(choosedBooking);
  bookings.splice(index,1);
  res.json({bookings});
})

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
