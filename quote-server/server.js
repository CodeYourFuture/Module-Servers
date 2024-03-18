// server.js
// This is where your node app starts

import express, { query } from "express";
//load the quotes JSON
import quotes from "./quotes.json" assert { type: "json" };

const app = express();

// app.get("/quotes/search", (request, response) => {
//   const n = request.query.term;
//   response.send(searchQuote(n));
// });

app.get("/quotes/random", (request, response) => {
  response.send(pickFromArray(quotes));
});


app.get("/quotes", (request, response) => {
  response.send(quotes);
});

app.get("/", (request, response) => {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes or /quotes/search");
});

app.get("/hello", (request, response) => {
  const n = request.query.name;
  response.send("Hello!  I'm a sever that just says hello to " + n);
});



//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
const pickFromArray = (arrayofQuotes) =>
  arrayofQuotes[Math.floor(Math.random() * arrayofQuotes.length)];

// const searchQuote = (searchTerm) =>
//   quotes.filter((quote) => quote.quote.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || quote.author.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));


//Start our server so that it listens for HTTP requests!
const listener = app.listen(3001, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
