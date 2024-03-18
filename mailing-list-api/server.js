const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 9000;

const mailingLists = require("./mailing-lists");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Mailing List REST API");
});

app.get("/lists", (req, res) => {
  const listNames = Object.keys(mailingLists);
  res.status(200).json(listNames);
});

app.get("/lists/:name", (req, res) => {
  const listName = req.params.name;
  const list = mailingLists[listName];
  if (list) {
    res.status(200).json({ name: listName, members: list });
  } else {
    res.sendStatus(404);
  }
});
////////////delete/////////////////

app.delete("/lists/:name", (req, res) => {
  const listName = req.params.name;
  if (mailingLists[listName]) {
    delete mailingLists[listName];
    res.status(200).json("successfully deleted");
  } else {
    res.status(404).json("not found to delete");
  }
});
////////////////put/////////////////
app.put("/lists/:name", (req, res) => {
  const listName = req.params.name;
  const { name: bodyName, members: bodyMembers } = req.body;

  if (listName && bodyName && bodyMembers) {
    if (mailingLists[listName]) {
      mailingLists[listName] = {
        name: bodyName,
        members: bodyMembers,
      };
      res.status(200).json({ name: bodyName, members: bodyMembers });
    } else {
      const newList = { name: bodyName, members: bodyMembers };
      mailingLists[listName] = newList;
      res.status(201).json(newList);
    }
  } else {
    res.sendStatus(400);
  }
});

const listener = app.listen(process.env.port, () => {
  console.log(`server is runing ${listener.address().port}`);
});
