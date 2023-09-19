const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mailingLists = require("./mailing-lists");

app.use(express.json());

const lists = new Map(Object.entries(mailingLists));

app.get("/lists", (req, res) => {
  const listNames = Array.from(lists.keys());
  res.status(200).json(listNames);
});

app.get("/lists/:name", (req, res) => {
  const listName = req.params.name;
  const members = lists.get(listName);

  if (members) {
    res.status(200).json({ name: listName, members });
  } else {
    res.status(404).json({ error: "List not found" });
  }
});

app.delete("/lists/:name", (req, res) => {
  const listName = req.params.name;

  if (lists.has(listName)) {
    lists.delete(listName);
    res.status(200).send("List deleted successfully");
  } else {
    res.status(404).json({ error: "List not found" });
  }
});

app.put("/lists/:name", (req, res) => {
  const listName = req.params.name;
  const { members } = req.body;

  if (lists.has(listName)) {
    lists.set(listName, members);
    res.status(200).send("List updated successfully");
  } else {
    lists.set(listName, members);
    res.status(201).send("List created successfully");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
