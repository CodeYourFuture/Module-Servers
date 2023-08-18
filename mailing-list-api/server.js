// server.js
const express = require("express");
const app = express();

//loading the mailing list JSON
const mailingList = require("./mailing-lists");
// middleware
app.use(express.json());

// registering handlers for some routes:

app.get("/lists", (req, res) => {
  const listOfNames = [];
  for (let name of Object.keys(mailingList)) {
    listOfNames.push(name);
  }
  res.json(listOfNames);
});
app.get("/lists/:name", (req, res) => {
  for (let [key, value] of Object.entries(mailingList)) {
    if (req.params.name == key) {
      res.json({ name: key, members: value });
    }
  }
  res.sendStatus(404);
});
app.delete("/lists/:name", (req, res) => {
  for (let [key, value] of Object.entries(mailingList)) {
    if (req.params.name == key) {
      delete mailingList[key];
      res.sendStatus(200);
    }
  }
  res.sendStatus(404);
});
app.put("/lists/:name", (req, res) => {
  for (let [key, value] of Object.entries(mailingList)) {
    if (req.params.name == key) {
      res.sendStatus(200);
    }
  }
  mailingList[req.body.name] = req.body.members;
  res.sendStatus(201);
});

app.listen(3000);
