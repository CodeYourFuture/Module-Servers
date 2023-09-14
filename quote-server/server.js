// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();
const PORT =9000;

//load the quotes JSON
const lodash = require("lodash");
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("siver's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", function (req, res){
  res.send(quotes)
})

app.get("/quotes/random", function (req, res) {
  res.send(lodash.sample(quotes))
  })
  app.get("/quotes/search", function(req, res) {
    const term = req.query.term.toLowerCase();
    const searchResult=quotes.filter((quote)=>
    quote.quote.toLowerCase().includes(term) ||
    quote.author.toLowerCase().includes(term)
    );
    res.json(searchResult);})
