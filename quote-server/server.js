const express = require("express");
const lodash = require("lodash");
const app1 = express();
const quotesData = require("./quotes.json"); // Directly require the JSON data
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.json());


app.get("/", function (request, response) {
  response.send(
    "Neill's Quote Server! Ask me for /quotes/random, /quotes, or /quotes/search?term={your search term}"
  );
});

app.get("/quotes", function (request, response) {
  response.json(quotesData);
});

app.get("/quotes/random", function (request, response) {
  const randomQuote = lodash.sample(quotesData);
  response.json(randomQuote);
});

app.get("/quotes/search", function (request, response) {
  const searchTerm = request.query.term;
  const filteredQuotes = quotesData.filter(
    (quote) =>
      quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  response.json(filteredQuotes);
});

app.get("/quotes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const quote = lodash.find(quotesData, { id: id });
  if (!quote) {
    return res.status(404).json({ error: "Message not found." });
  }
  res.json(quote);
});

app.post("/quotes", function (req, res) {
  const newQuote = req.body;
  newQuote.id = Date.now().toString(); // Convert the id to a string based on the current timestamp
  quotesData.push(newQuote);

  // Write the updated quotes data to the JSON file
  fs.writeFileSync("./quotes.json", JSON.stringify(quotesData, null, 2));

  res.json(newQuote);
});

function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const PORT = 45479;
app1.listen(PORT, function () {
  console.log("Your app is listening on port " + PORT + "......");
});
