// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
import express, { response } from "express";
//load the quotes JSON
// import quotes from "./quotes.json" assert { type: "json" };

const app = express();

const getQuotes = async (url) => {
  const response = await fetch(url);
  return response.json();
};

app.get("/", async (request, response) => {
  response.send("Marcus' Quote Server!  Ask me for /quotes/random, or /quotes");
});

app.get("/quotes", async (req, res) => {
  const pageNumber = req.query.page;
  const getAllQuotes = await getQuotes(
    `https://api.quotable.io/quotes?page=${pageNumber}`
  );
  res.send(getAllQuotes);
});

app.get("/quotes/random", async (req, res) => {
  const pageNumber = req.query.page;
  const getAllQuotes = await getQuotes(
    `https://api.quotable.io/quotes?page=${pageNumber}`
  );
  const randomQuotes =
    getAllQuotes.results[
      Math.floor(Math.random() * getAllQuotes.results.length)
    ];
  res.send(randomQuotes);
});

app.get("/quotes/search", (req, res) => {
  const searchQuery = req.query.term.toLowerCase();
  if (searchQuery) {
    const filterSearch = quotes.filter(
      (quote) =>
        quote.quote.toLowerCase().includes(searchQuery) ||
        quote.author.toLowerCase().includes(searchQuery)
    );
    res.send({ quotes: filterSearch });
  } else {
    res.send([]);
  }
});

const listener = app.listen(3001, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
