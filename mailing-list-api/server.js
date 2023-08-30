process.env.PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mailingLists = require("./mailing-lists");

app.use(bodyParser.json());

console.log(mailingLists);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

app.get("/lists", (req, res) => {
  res.send(mailingLists);
});

app.get("/lists/:name", (req, res) => {
  const name = req.params.name;
  for (const list in mailingLists) {
    if (list === name) {
      res.status(200).send(`${list}: ${mailingLists[list]}`);
    } else {
      res.status(404).send();
    }
  }
});

app.delete("/lists/:name", (req, res) => {
  const name = req.params.name;
  for (const list in mailingLists) {
    if (list === name) {
      delete mailingLists[list];
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  }
});

app.put("/lists/:name", (req, res) => {
  console.log(req.body);
  const name = req.params.name;
  const newMembers = req.body.members;
  for (const list in mailingLists) {
    if (list === name) {
      newMembers.forEach((member) => {
        mailingLists[list].push(member);
      });
      res.status(200).send();
    } else {
      mailingLists[name] = [];
      newMembers.forEach((member) => {
        mailingLists[name].push(member);
      });
      res.status(201).send();
    }
  }
});

for (const list in mailingLists) {
  console.log(list);
}
