// server.js

// This is where your node app starts

// load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

// load the quotes JSON
const quotes = require("./quotes.json");

// load the lodash library
const _ = require("lodash");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

// START OF YOUR CODE...

// Route to get all quotes
app.get("/quotes", function (request, response) {
  response.json(quotes);
});

// Route to get random quote
app.get("/quotes/random", function (request, response) {
  const randomQuote = _.sample(quotes); // using lodash sample function
  response.json(randomQuote);
});

// Route to get quotes based on a term in the query string
app.get("/quotes/search", function (request, response) {
  let term = request.query.term.toLowerCase();
  let filteredQuotes = quotes.filter(
    (quote) =>
      quote.quote.toLowerCase().includes(term) ||
      quote.author.toLowerCase().includes(term)
  );
  response.json(filteredQuotes);
});

// ...END OF YOUR CODE

// Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
