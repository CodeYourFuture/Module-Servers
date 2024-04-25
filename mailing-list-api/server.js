const express = require("express");
const data = require("./mailing-lists");
const app = express();
app.use(express.json());
const lists = new Map(Object.entries(data));
app.get("/lists", (req, res) => {
  const listsArray = Array.from(lists.keys());
  if (listsArray.length > 0) {
    res.status(200).send(listsArray);
  } else {
    res.status(200).send({});
  }
});
app.get("/lists/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const listsArray = lists.get(name);
  if (listsArray) {
    res.status(200).send(listsArray);
  } else {
    res.status(404).send("list not found");
  }
});
app.delete("/lists/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  if (lists.has(name)) {
    lists.delete(name);
    const updatedList = Array.from(lists.keys());
    res.status(200).send(updatedList);
  } else {
    res.status(404).send("list not found");
  }
});
app.put("/lists/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  if (lists.has(name)) {
    const putListBody = req.body;
    lists.set(name, putListBody);
    const updatedList = Array.from(lists.keys());
    res.status(200).send(updatedList);
  } else {
    const putListBody = req.body;
    console.log(putListBody);
    lists.set(name, putListBody);
    const updatedList = Array.from(lists.keys());
    res.status(201).send(updatedList);
  }
});
app.listen(3000, () => {
  console.log("Server is listen to 3000");
});
