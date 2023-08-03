const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// Route to post new booking
app.post("/bookings", (request, response) => {
  const { firstName, surname, title, email, roomId, checkInDate, checkOutDate} = request.body; 

  if (!firstName|| !surname|| !title || !email || !roomId || !checkInDate || !checkOutDate) {
    return response.status(400).json({ error: "Name, email, or date is missing." });
  }
  const newBooking = {
    id: bookings.length +1, 
      title,
      firstName,
      surname,
      email,
      roomId,
      checkInDate,
      checkOutDate
  };
  bookings.push(newBooking);
  console.log(bookings); 
  response.redirect("/"); 
});

//Route to reject insufficient requests
app.post("/bookings", function (request, response) {
  const booking = request.body;
  if(!firstName|| !surname|| !title || !email || !roomId || !checkInDate || !checkOutDate)
  return response.status(400).json({ error: "Name, email, or date is empty." });

  const rejectedBooking = {
    id: bookings.length +1, 
      title,
      firstName,
      surname,
      email,
      roomId,
      checkInDate,
      checkOutDate
  };
  bookings.push(rejectedBooking);
  return response.status(200).send({message: "Booking created successfully!", booking});
});

//Route to get all bookings
app.get("/bookings", function(request, response) {
  response.json({bookings});
});

// route to get booking by id
app.get("/bookings/:id", function(request, response) {
  const idToFind = Number(request.params.id)
  const booking = bookings.find((booking) => booking.id === idToFind);
  console.log(booking);
  response.send(booking);
});

// Route to delete bookings by id
app.delete("/bookings/:id", function(request, response) {
  const idToDelete = Number(request.params.id);
  const deletedBooking = bookings.find((booking)=> booking.id === idToDelete);
  response.status(204).send(deletedBooking);
})


// TODO add your routes and helper functions here

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
