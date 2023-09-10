const express = require("express");
const app = express();
const port = 9000;

app.use(express.json());

const lists = new Map();

app.get("/", (req, res) => {
  res.status(200).send("list a name by writing /list");
});

app.get("/lists", (req, res) => {
  const listNames = [...lists.keys()];
  res.status(200).json(listNames);
});

app.get("/lists/:name", (req, res) => {
  const listName = req.params.name;
  const list = lists.get(listName);

  if (list) {
    res.status(200).json(list);
  } else {
    res.status(404).send("List not found");
  }
});

app.delete("/lists/:name", (req, res) => {
  const listName = req.params.name;

  if (lists.has(listName)) {
    lists.delete(listName);
    res.status(200).send("List deleted successfully");
  } else {
    res.status(404).send("List not found");
  }
});

app.put("/lists/:name", (req, res) => {
  const listName = req.params.name;
  const newList = req.body;

  if (lists.has(listName)) {
    lists.set(listName, newList);
    res.status(200).send("List updated successfully");
  } else {
    lists.set(listName, newList);
    res.status(201).send("List created successfully");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
