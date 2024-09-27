process.env.PORT = process.env.PORT || 3040;
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const mailingLists = require("./mailing-lists");


app.get("/lists", (req, res) => {
  const listNames = Object.keys(mailingLists);
  res.status(200).json(listNames);
});


app.get("/lists/:name", (req, res) => {
  const name = req.params.name;
  const list = mailingLists[name];

  const singleList = {
    name: name,
    members: list,
  };

  if (list) {
    res.status(200).json(singleList);
  } else {
    res.status(404).json("List not found");
  }
});


app.delete("/lists/:name", (req, res) => {
  const name = req.params.name;

  if (mailingLists[name]) {
    delete mailingLists[name];
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});


app.put("/lists/:name", express.json(), (req, res) => {
  const name = req.params.name;
  const members = req.body.members;

  if (mailingLists[name]) {
    mailingLists[name] = members;
    res.sendStatus(200);
  } else {
    mailingLists[name] = members;
    res.sendStatus(201);
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
