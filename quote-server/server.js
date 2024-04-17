import express from "express";
import quotes from "./quotes.json" assert { type: "json" };

const app = express();

app.get("/", (request, response) => {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});


app.get("/quotes", (req, res) => {
  res.json(quotes);
});

app.get("/quotes/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json(pickFromArray(quotes));
});



const pickFromArray = (arrayofQuotes) => arrayofQuotes[Math.floor(Math.random() * arrayofQuotes.length)];

const listener = app.listen(3001, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
