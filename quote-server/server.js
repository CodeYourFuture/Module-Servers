import express from "express";
import quotes from "./quotes.json" assert { type: "json" };
const app = express();
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json

app.get("/", (request, response) => {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});
app.get("/quotes", (request, response) => {
  console.log("you are lestining for hello endpoint");
  response.send({ quotes });
});

app.get("/quotes/random", (req, res) => {
  console.log("you are hitting random quotes");
  const pickFromArray = (quotes) =>
    quotes[Math.floor(Math.random() * quotes.length)];
  const randomQuote = pickFromArray(quotes);
  res.send(randomQuote);
});

app.get("/quotes/search", (req, res) => {
  console.log("you are hitting the query route");
  const searchQuery = req.query.terms.toLocaleLowerCase();
  const filterQuote = quotes.filter(
    (quote) =>
      quote.quote.toLocaleLowerCase().includes(searchQuery) ||
      quote.author.toLocaleLowerCase().includes(searchQuery)
  );
  res.send({ filterQuote });
});

app.get("/echo", (req, res) => {
  const getWord = req.query.word;
  if (getWord) {
  }
  res.send(`you said ${getWord}`);
});

//Start our server so that it listens for HTTP requests!
const listener = app.listen(3001, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
