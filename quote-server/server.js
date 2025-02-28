import express from "express";
import quotes from "./quotes.json" assert { type: "json" };
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());

app.get("/", (request, response) => {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

app.get("/quotes", (request, response) => {
  response.json(quotes);
});

app.get("/quotes/random", (request, response) => {
  const randomQuote = pickFromArray(quotes);
  response.json(randomQuote);
});

const pickFromArray = (arrayofQuotes) =>
  arrayofQuotes[Math.floor(Math.random() * arrayofQuotes.length)];

// listen for requests :)

const listener = app.listen(port, () => {
  console.log(
    "Your app is listening on port http://localhost:" + listener.address().port
  );
});

// Search for quotes by term

app.get("/quotes/search", (request, response) => {
  const searchTerm = request.query.term?.toLowerCase();

  if (!searchTerm) {
    return response.json({ error: "Please provide a search term." });
  }

  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.quote.toLowerCase().includes(searchTerm) ||
      quote.author.toLowerCase().includes(searchTerm)
  );

  response.json(filteredQuotes);
});
