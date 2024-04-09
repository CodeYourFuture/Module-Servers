// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
import express from "express";
//load the quotes JSON
import quotes from "./quotes.json" assert { type: "json" };

const app = express();

app.get("/", (request, response) => {
  response.send("Hadika's Quote Server!  Ask me for /quotes/random, or /quotes");
});
app.get("/quotes", (req,res) => {
  res.send(quotes);
})
app.get("/quotes/random", (req, res) => {
  res.send(pickFromArray(quotes));
})

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
const pickFromArray = (arrayofQuotes) =>
  arrayofQuotes[Math.floor(Math.random() * arrayofQuotes.length)];

//Start our server so that it listens for HTTP requests!
const listener = app.listen(3001, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
