// server.js
// This is where your node app starts
const cors = require("cors");
const lodash = require("lodash");
//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");
// middleware
app.use(cors());
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//   /quotes            - Should return all quotes (json)
app.get("/quotes", (req, res) => {
  res.json(quotes);
});
//   /quotes/random     - Should return ONE quote (json)
app.get("/quotes/random", (req, res) => {
  const randomQuote = lodash.sample(quotes);
  res.json([randomQuote]);
});

//START OF YOUR CODE...
app.get("/quotes/search", (req, res) => {
  const term = req.query.term;
  const searchQuote = quotes.filter(
    (el) =>
      el.quote.toLowerCase().includes(term.toLowerCase()) ||
      el.author.toLowerCase().includes(term.toLowerCase())
  );
  res.json(searchQuote);
});
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
