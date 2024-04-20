import express from "express";
import quotes from "./quotes.json" assert { type: "json" };
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (request, response) => {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

app.get("/quotes", (req, res) => {
  res.json(quotes);
});

app.get("/quotes/random", (req, res) => {
  res.json(pickFromArray(quotes));
});

app.get("/quotes/search", (req, res) => {
  const searchTerm = req.query.term;
  if (!searchTerm) {
    return res.status(400).json({ error: "No search term provided" });
  }
  const searchTermLowerCase = searchTerm.toLowerCase();
  const searchedQuotes = quotes.filter((quote) => quote.quote.toLowerCase().includes(searchTermLowerCase) || quote.author.toLowerCase().includes(searchTermLowerCase));
  res.json(searchedQuotes);
});

const pickFromArray = (arrayofQuotes) => arrayofQuotes[Math.floor(Math.random() * arrayofQuotes.length)];

const listener = app.listen(3001, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
