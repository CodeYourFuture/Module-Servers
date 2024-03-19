import express, { query } from "express";
import cors from "cors"
import quotes from "./quotes.json" assert { type: "json" };



const app = express();
app.use(cors());
app.get("/quotes/search", (request, response) => {
  const n = request.query.term;
  response.send(searchQuote(n.toLocaleLowerCase()));
});

app.get("/quotes/random", (request, response) => {
  response.send(pickFromArray(quotes));
});

app.get("/quotes", (request, response) => {
  response.send(quotes);
});

app.get("/", (request, response) => {
  response.send("Adniya's Quote Server!  Ask me for /quotes/random, or /quotes or /quotes/search");
});

const pickFromArray = (arrayofQuotes) =>
  arrayofQuotes[Math.floor(Math.random() * arrayofQuotes.length)];

const searchQuote = (searchTerm) =>
  quotes.filter((quote) => quote.quote.toLocaleLowerCase().includes(searchTerm) || quote.author.toLocaleLowerCase().includes(searchTerm));


//Start our server so that it listens for HTTP requests!
const listener = app.listen(3001, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
