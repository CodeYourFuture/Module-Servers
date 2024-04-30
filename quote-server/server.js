import express from "express";

const quotesApi = "https://api.quotable.io/quotes?page=1"
const quotes = [];
const app = express();
const port = process.env.PORT || 3001;

fetch(quotesApi)
  .then(response => response.json())
  .then(data => {
    data.results.forEach(quote => {
      quotes.push({
        quote: quote.content,
        author: quote.author
      })
    })
    app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
    });
  })
  .catch(error => {
    console.log(error);
  })

app.get("/quotes", (request, response) => {
  response.json(quotes);
})

app.get("/quotes/random", (request, response) => {
  response.json(pickQuoteFromArray(quotes));
})

app.get("/quotes/search", (request, response) => {
  const searchTerm = request.query.term;
  const searchResults = findQuoteByKeyword(searchTerm);
  response.json(searchResults);
})

function pickQuoteFromArray(arrayOfQuotes) {
  return arrayOfQuotes[Math.floor(Math.random() * arrayOfQuotes.length)];
}

function findQuoteByKeyword(searchTerm) {
  const searchTermLowerCase = searchTerm.toLowerCase();

  const searchResults = quotes.filter(quote => {
    const quoteLowerCase = quote.quote.toLowerCase();
    const authorLowerCase = quote.author.toLowerCase();

    return quoteLowerCase.includes(searchTermLowerCase) || authorLowerCase.includes(searchTermLowerCase);
  });
  return searchResults;
}

app.get("/", (request, response) => {
  response.send("Pedro's Quote Server!  Ask me for /quotes/random, /quotes, or quotes/search?term='search term'");
});