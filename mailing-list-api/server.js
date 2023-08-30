const express = require("express");
const app = express();
const port = 3000;
const mailingLists = require("./mailing-lists");

console.log(mailingLists);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
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
      res.send();
    }
  }
});

for (const list in mailingLists) {
  console.log(list);
}
