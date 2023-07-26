const express = require("express");
const app = express();
const lodash = require("lodash");
const path = require("path");

var cors = require("cors");

app.use(cors());

app.use(express.static(path.join(__dirname, "client", "build")));

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)

app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...

app.get("/quotes", function (request, response) {
  response.json(quotes);
});

app.get("/quotes/random", function (request, response) {
  response.json(pickFromArray(quotes));
});

app.get("/quotes/search", function (request, response) {
  let searchTerm = request.query.term;

  let filteredQuotes = quotes.filter((quote) => {
    return (
      quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  response.json(filteredQuotes);
});

// Challenge: Intermediate: Use a library to make random picking easier

app.get("/quotes/sample", function (request, response) {
  response.json(lodash.sample(quotes));
  console.log("this should return sample");
});

//this lodash librery is not working
//installed npm install lodash
//I can see it already within the dependecies
//// "dependencies": {
////     "express": "^4.18.2",
////    "lodash": "^4.17.21"
//I used it wrongly I was response.lodash.sample instead of respons.json(lodash.sample(quotes))

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
let port = 5000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
