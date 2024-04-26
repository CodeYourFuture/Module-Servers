import express from "express";
import mailinglist from "./mailing-lists.js";
const PORT = 3000;

const app = express();
app.use(express.json());

const mailList = mailinglist;

// fetch all list names
app.get("/lists", (req, res) => {
  const listsArray = Object.keys(mailList);
  res.status(200).json(listsArray);
});

// get a single name
app.get("/lists/:name", (req, res) => {
  const name = req.params.name;
  const list = mailList[name];
  if (list) {
    res.status(200).json({ name, members: list });
  } else {
    res.status(404).json({ error: "List not found" });
  }
});

// delete a name
app.delete("/lists/:name", (req, res) => {
  const name = req.params.name;
  if (mailList[name]) {
    delete mailList[name];
    res.status(200).json({ message: "Successfully deleted" });
  } else {
    res.status(404).json({ message: "Name not found for deletion" });
  }
});

// add or update a list
app.put("/lists/:name", (req, res) => {
  const name = req.params.name;
  const members = req.body.members;

  if (mailList[name]) {
    mailList[name] = members;
    res.status(200).send();
  } else {
    mailList[name] = members;
    res.status(201).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
