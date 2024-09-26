import express from "express";
import bodyParser from "body-parser";
import mailingLists from "./mailing-lists.js";

const app = express();
app.use(bodyParser.json());

const lists = mailingLists;

//fetch all existing list names
app.get("/lists", (req, res) => {
  const listNames = Object.keys(lists);
  res.status(200).json(listNames);
});

//  fetch a single list by name
app.get("/lists/:name", (req, res) => {
  const name = req.params.name;
  const list = lists[name];

  if (list) {
    res.status(200).json({ name, members: list });
  } else {
    res.status(404).send("List not found");
  }
});

// delete a list by name
app.delete("/lists/:name", (req, res) => {
  const name = req.params.name;

  if (lists[name]) {
    delete lists[name];
    res.status(200).send("List deleted");
  } else {
    res.status(404).send("List not found");
  }
});

// update or create a list with the given name
app.put("/lists/:name", (req, res) => {
  const name = req.params.name;
  const members = req.body.members;

  if (lists[name]) {
    lists[name] = members;
    res.status(200).send("List updated");
    console.log(`List ${name} updated with members:`, members);
  } else {
    lists[name] = members;
    res.status(201).send("New list created");
    console.log(`New list ${name} created with members:`, members);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
