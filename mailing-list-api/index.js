const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var bodyParser = require("body-parser");

const lists = require("./mailing-lists");
console.log(lists);

app.get("/lists", (req, res) => {
  //200 and empty array if none exist
  listNames = [];
  for (const property in lists) {
    listNames.push(property);
  }
  if (Object.keys(lists).length == 0) {
    res.status(200).send([]);
  }
  res.status(200).json(listNames);
});

app.get("/lists/:name", (req, res) => {
  //const keys = Object.keys(lists);
  //Object.values() static method returns an array of a given object's own enumerable string-keyed property values
  //const memebersArray = Object.values(lists);
  //some important info but werent used!
  const name = {
    name: req.params.name,
    members: lists[req.params.name],
  };
  if (!name) {
    res.status(404).send("name is not found");
  }
  res.status(200).send(name);
});

app.delete("/lists/:name", (req, res) => {
  const pro = req.params.name;
  if (!(pro in lists)) {
    res.status(404).send("property not found to delete");
  }
  delete lists[pro];
  res.status(200).send("successfully deleted");
});

app.put("/lists/:name", (req, res) => {
  const name = req.params.name; //params take the value from the URL, it is 'name' values for the list here. 
  const updatedMembers = req.body.members;

  if (!lists[name]) {
    return res.status(404).send("list not found");
  }

  lists[name] = updatedMembers;
  res.json(updatedMembers);
});


app.listen(3007, () => {
  console.log("server started on the port 3007");
});
