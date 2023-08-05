const express = require("express");
const app = express();
const port = 3000; // You can change this to your desired port

// Sample data
const lists = new Map();
lists.set("staff", {
  name: "staff",
  members: ["talea@techtonica.org", "michelle@techtonica.org"],
});

// Middleware to parse JSON bodies
app.use(express.json());

// Index - fetch all existing list names
app.get("/lists", (req, res) => {
  const listsArray = Array.from(lists.keys());
  res.status(200).json(listsArray);
});

// GET single list - get list by name
app.get("/lists/:name", (req, res) => {
  const name = req.params.name;
  const list = lists.get(name);

  if (list) {
    res.status(200).json(list);
  } else {
    res.status(404).json({ error: "List not found" });
  }
});

// DELETE single list - delete list by name
app.delete("/lists/:name", (req, res) => {
  const name = req.params.name;
  const deleted = lists.delete(name);

  if (deleted) {
    res.status(200).send();
  } else {
    res.status(404).json({ error: "List not found" });
  }
});

// PUT - update single list
app.put("/lists/:name", (req, res) => {
  const name = req.params.name;
  const { members } = req.body;

  if (lists.has(name)) {
    // Update existing list
    lists.set(name, { name, members });
    res.status(200).send();
  } else {
    // Create new list
    lists.set(name, { name, members });
    res.status(201).send();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
