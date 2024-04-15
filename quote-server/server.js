// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
import express from "express";
import fetch from "node-fetch";
//load the quotes JSON
// import quotes from "./quotes.json" assert { type: "json" };
let quotes = [];

const fetchQuotes = async () => {
  try {
    const quoted = await fetch("https://api.quotable.io/quotes?page=1");
    const parsedQuote = await quoted.json();
    quotes = parsedQuote.results;
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
};
fetchQuotes();
const app = express();
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)

app.get("/", (request, response) => {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});
app.get("/quotes", (request, response) => {
  response.send({ quotes });
  console.log(request.query);
});
app.get("/quotes/random", (request, response) => {
  response.send(pickFromArray(quotes));
});
app.get("/quotes/search", (request, response) => {
  const searchQuery = request.query.term;
  console.log(searchQuery);
  const searchQueryCase = searchQuery.toLocaleLowerCase();
  console.log(searchQuery);

  const filteredQuotes = quotes.filter((quote) => {
    // console.log(quote.author);
    return (
      quote.content.toLocaleLowerCase().includes(searchQueryCase) ||
      quote.author.toLocaleLowerCase().includes(searchQueryCase)
    );
  });

  response.send(filteredQuotes);
});
//START OF YOUR CODE...

//...END OF YOUR CODE

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
