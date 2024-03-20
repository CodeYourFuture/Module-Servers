// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
import express from "express";
//load the quotes JSON
import quotes from "./quotes.json" assert { type: "json" };
// const express = require("express");
const app = express();
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", (request, response) => {
  response.send(
    "Behrouz's Quote Server!  Ask me for /quotes/random, or /quotes"
  );
});

//START OF YOUR CODE...
const port = 3000;
// app.listen(port, () => {
//   console.log("Listening on port 3001 !");
// });

app.get("/quotes", (req, res) => {
  res.send(quotes);
});
app.get("/quotes/random", (req, res) => {
  const randomQuote = pickFromArray(quotes);
  console.log(randomQuote, "this is a random quote");
  return res.send(randomQuote);
});
//...END OF YOUR CODE
//============LEVEL-2 =====================
const termFinderInQuotes = (array, term) => {
  return array
    .filter((item) => item.quote.toLowerCase().includes(term.toLowerCase()))
    .map((item) => item.quote);
};

app.get("/quotes/search", (req, res) => {
  const term = req.query.term;
  res.send(termFinderInQuotes(quotes, term));
});
//================================

//============ECHO THE PARAMTRE================
app.get("/echo", (req, res) => {
  const queryParam = req.query.word;
  res.send(`You said: '${queryParam}'`);
});

//=============================================
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
