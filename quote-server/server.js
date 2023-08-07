
const express = require("express");
const quotes = require("./quotes.json");
const PORT = 3030;

const app = express();
const lodash = require('lodash');


app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

app.get("/quotes", function (req, res){
    res.send(quotes)
})



app.get("/quotes/random", function (req, res) {
  res.send(lodash.sample(quotes))
})

app.get("/quotes/search", function(req, res) {
  const term = req.query.term
  // console.log(term)
  const resultSearchQuotes = searchQuotes(term)
  res.send(resultSearchQuotes)
})

function searchQuotes(term){
  const results = quotes.filter(element => element.quote.toLowerCase().includes(term.toLowerCase()) || element.author.toLowerCase().includes(term.toLowerCase()))
  return results;
}

function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + PORT);
});
