const express = require("express");
const fs = require("fs");
const bookings = JSON.parse(fs.readFileSync("./bookings.json"))
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
app.get('/api/hotel', (req, res) => {
  res.send(bookings)
})

// TODO add your routes and helper functions here


const port = process.env.PORT || 5099;
app.listen(port, () => console.log(`listen on port ${port} .....!!`));