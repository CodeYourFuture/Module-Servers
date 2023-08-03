// This is where your node app starts

// Load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

// Load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

// Return all quotes as JSON
app.get("/quotes", function (request, response) {
  response.json(quotes);
});

// Return one random quote as JSON
app.get("/quotes/random", function (request, response) {
  const randomQuote = pickFromArray(quotes);
  response.json(randomQuote);
});

// Search for quotes based on a search term
app.get("/quotes/search", function (request, response) {
  const searchTerm = request.query.term.toLowerCase(); // Case-insensitive search
  const matchingQuotes = quotes.filter(
    (quote) =>
      quote.quote.toLowerCase().includes(searchTerm) ||
      quote.author.toLowerCase().includes(searchTerm)
  );
  response.json(matchingQuotes);
});

// Function to pick one element at random from a given array
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
