const express = require("express");
const data = require("./mailing-lists");
const app = express();
app.use(express.json());
port = 3000;

const list = new Map(Object.entries(data));

app.listen(port, () => {
  console.log(`listening on porttt: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.get("/list", (req, res) => {
  const arrayOfList = Array.from(list.keys());

  if (arrayOfList.length > 0) {
    res.status(200).send(arrayOfList);
  } else {
    res.status(200).send([]);
  }
});

app.get("/list/:name", (req, res) => {
  const endpointName = req.params.name;

  // const listOfKeys = Array.from(list.keys());
  const hasEndpontName = list.has(endpointName);

  if (hasEndpontName) {
    const emailsOfMemebers = list.get(endpointName);
    const responseBody = {
      name: endpointName,
      members: emailsOfMemebers,
    };
    res.status(200).send(responseBody);
  } else {
    res.status(404).send("404 , Data not found!");
  }
});

app.delete("/list/:name", (req, res) => {
  const nameOfList = req.params.name;

  const hasDelted = list.delete(nameOfList);

  if (hasDelted) {
    res.status(200).send("Delte was successful");
  } else {
    res.status(404).send("item wasn't found");
  }
});

app.put("/list/:name", (req, res) => {
  const nameInParams = req.params.name;

  const nameInBody = req.body.name;
  const newMembers = req.body.members;

  if (nameInParams != nameInBody || !nameInBody || newMembers.length == 0) {
    res
      .status(409)
      .send(
        "List can not be updated due to the conflict in the name of path and updated request!"
      );
  } else {
    const hasTheName = list.has(nameInBody);
    if (hasTheName) {
      const oldMembers = list.get(nameInParams);
      const updatedmembers = oldMembers.concat(newMembers);
      list.set(nameInBody, updatedmembers);
      res.status(200).send("Updated successfully");
    } else {
      list.set(nameInBody, newMembers);
      res.status(201).send("New list added!");
    }
    console.log(list);
  }
});
