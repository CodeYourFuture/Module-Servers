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

// TODO add your routes and helper functions here

app.post("/bookings",function (request,response){
  const newBooking=request.body;
  bookings.push(newBooking);
  response.status(201).send({newBooking});
});

app.get("/bookings",function(request,response){
  response.send(bookings);
});

app.get("/bookings",function(request,response){
  const bookingId=parseInt(request.params.id);
  const booking=bookings.find((b)=>bookingId);


  if (!booking) {
    return response.status(404).send({ error: "Booking not found" });
  }

  response.send(booking);

})

app.delete("/bookings/:id",function(request,response){
  const bookingId=parseInt(request.params.id);
  const bookingIndx=bookings.findIndex((b) => b.id === bookingId);

  if (bookingIndx === -1) {
    return res.status(404).send({ error: "Booking not found" });
  }

  const deletedBooking = bookings.splice(bookingIndx, 1)[0];
  res.send(deletedBooking);
});


const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
