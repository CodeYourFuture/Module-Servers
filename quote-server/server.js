import express from "express";
import quotes from "./quotes.json" assert { type: "json" };

const app = express();
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});

app.get("/", (request, response) => {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

app.get("/quotes", (request, response) => {
  response.json(quotes);
})

app.get("/quotes/random", (request, response) => {
  response.json(pickFromArray(quotes));
})

app.get("/quotes/search", (request, response) => {
  const searchTerm = request.query.term;
  const searchResults = findQuoteByKeyword(searchTerm);
  response.json(searchResults);
})

function pickFromArray(arrayOfQuotes) {
  return arrayOfQuotes[Math.floor(Math.random() * arrayOfQuotes.length)];
}

function findQuoteByKeyword(searchTerm) {
  const searchResults = quotes.filter(quote => {
    return quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return searchResults;
}
