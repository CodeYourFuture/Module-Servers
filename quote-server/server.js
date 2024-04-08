import express from "express";

const quotesApi = "https://api.quotable.io/quotes?page=1"
const quotes = [];
const app = express();
const PORT = 3001;

fetch(quotesApi)
  .then(response => response.json())
  .then(data => {
    data.results.forEach(quote => {
      quotes.push({
        quote: quote.content,
        author: quote.author
      })
    })
  })
  .catch(error => {
    console.log(error);
  })

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
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

app.get("/", (request, response) => {
  response.send("Pedro's Quote Server!  Ask me for /quotes/random, /quotes, or quotes/search?term='search term'");
});