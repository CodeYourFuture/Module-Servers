// server.js
const cors = require("cors");
const express = require("express");
const app = express();

//loading the mailing list JSON
const mailingList = require("./mailing-lists");
// middleware
app.use(cors());

// registering handlers for some routes:
app.get("/lists", (req, res) => {
  const listOfNames = [];
  for (let name of Object.keys(mailingList)) {
    listOfNames.push(listOfNames);
  }
  res.json(empty);
});
app.get("/lists/:name", (req, res) => {
  for (let [key, value] of Object.entries(mailingList)) {
    if (req.params.name == key) {
      res.json({ name: key, members: value });
    }
    res.json(`The ${req.params.name} does not exist. Try again!`);
  }
});
//Start our server so that it listens for HTTP requests!
app.listen(3000);
