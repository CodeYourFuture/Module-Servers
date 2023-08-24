const express = require("express");
const app = express();

const lists = require("./mailing-lists");

app.get("/", (req, res) => {
  res.send("Go to '/lists' to fetch all the existing file names");
});

app.get("/lists", (req, res) => {
  try {
    const listsArray = Object.keys(lists);
    res.status(200).json(listsArray);
  } catch (err) {
    res.status(200).json([]);
  }
});

app.get("/lists/:name", (req, res) => {
  try {
    const listName = req.params.name;
    const list = lists[listName];
    if (list) {
      res.status(200).json({ name: listName, members: list });
    } else {
      res.status(404).send("List not found");
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

app.delete("/lists/:name", (req, res) => {
  try {
    const listName = req.params.name;
    delete lists[listName];
    res.status(200).send("List deleted");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

app.put("/lists/:name", (req, res) => {
  try {
    const listName = req.params.name;
    const list = req.body;
    lists[listName] = list;
    res.status(200).send("List updated");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));
