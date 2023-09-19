// server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const quotes = require("./quotes.js");

app.get("/", function (request, response) {
  response.send("Onur Atas's Quote Server! Ask for /quotes/random, /quotes, or /quotes/search?term=yourterm");
});

app.get("/quotes", function (request, response) {
  response.json(quotes);
});

app.get("/quotes/random", function (request, response) {
  const randomQuote = pickFromArray(quotes);
  response.json(randomQuote);
});

app.get("/quotes/search", function (request, response) {
  const searchTerm = request.query.term;
  const matchingQuotes = searchQuotes(searchTerm);
  response.json(matchingQuotes);
});

function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function searchQuotes(term) {
  return quotes.filter((quote) =>
    quote.quote.toLowerCase().includes(term.toLowerCase()) ||
    quote.author.toLowerCase().includes(term.toLowerCase())
  );
}

const listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
