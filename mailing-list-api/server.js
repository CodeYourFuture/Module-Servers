const express = require("express");
const app = express();

app.disable("x-powered-by");

const lists = require("./mailing-lists.js");
const listsMap = new Map(Object.entries(lists));

app.use(express.json());

// GET /lists
app.get("/lists", (req, res) => {
  res.json(Array.from(listsMap.keys()));
});

// GET /lists/:name
app.get("/lists/:name", (req, res) => {
  const list = listsMap.get(req.params.name);
  if (list) {
    res.json({ name: req.params.name, members: list });
  } else {
    res.status(404).send("List not found");
  }
});

// DELETE /lists/:name
app.delete("/lists/:name", (req, res) => {
  const hasList = listsMap.delete(req.params.name);
  if (hasList) {
    res.status(200).send("List deleted successfully");
  } else {
    res.status(404).send("List not found");
  }
});

// PUT /lists/:name
app.put("/lists/:name", (req, res) => {
  if (req.params.name !== req.body.name) {
    res.status(400).send("Error: Name in URL path and JSON body do not match");
  } else {
    const list = listsMap.get(req.params.name);
    if (list) {
      listsMap.set(req.params.name, req.body.members);
      res.status(200).send("List updated successfully");
    } else {
      listsMap.set(req.params.name, req.body.members);
      res.status(201).send("List created successfully");
    }
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
