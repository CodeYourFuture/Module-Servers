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
  const randomQuote = pickFromArray(quotes);
  res.json(randomQuote);
});
// example http://localhost:3001/quotes/search?term=day

app.get("/quotes/search", (request, response) => {
  const searchTerm = request.query.term;
  console.log("Search Term:", searchTerm);

  const matchingQuotes = quotes.filter((quote) => {
    const quoteText = quote.quote.toLowerCase();
    const authorName = quote.author.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return (
      quoteText.includes(searchTermLower) ||
      authorName.includes(searchTermLower)
    );
  });
  //bring in JSON format
  response.json(matchingQuotes);
});
app.get("/echo", (request, response) => {
  const word = request.query.word;
  response.send(`You said '${word}'`);
});
//  pick one element randomly from an array
const pickFromArray = (arrayofQuotes) =>
  arrayofQuotes[Math.floor(Math.random() * arrayofQuotes.length)];

//Start our server
const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
