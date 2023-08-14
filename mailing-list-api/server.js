const express = require("express");
const cors = require("cors");

let corsOptions = {
  origin: "localhost",
};

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(cors(corsOptions));

const mailingListObject = require("./mailing-lists");

app.get("/", function (request, response) {
  response.send("Mailing list server");
});

app.get("/lists", function (request, response) {
  let mailingListKeys = Object.keys(mailingListObject);
  if (mailingListKeys) {
    response.status(200).json(mailingListKeys);
  } else {
    response.status(200).json([]);
  }
});

app.get("/lists/:name", function (request, response) {
  const nameSearch = request.params.name;
  console.log(request.params.name);

  const foundList = mailingListObject[nameSearch];
  let singleList = {
    name: nameSearch,
    members: foundList,
  };

  if (foundList) {
    response.status(200).json(singleList);
  } else {
    response.status(404).json("List not found");
  }
});

app.delete("/lists/:name", function (request, response) {
  const nameDelete = request.params.name;
  const foundName = mailingListObject[nameDelete];

  if (foundName) {
    delete mailingListObject[foundName];
    response.status(200).json(mailingListObject);
  } else {
    response.status(404).json({ message: "List not found." });
  }
});

app.put("/lists/:name", function (request, response) {
  const listName = request.params.name;
  const newOrUpdatedList = request.body;

  const foundList = mailingListObject[listName];
  if (foundList) {
    mailingListObject[listName] = newOrUpdatedList;
    response.status(200).end();
  } else {
    mailingListObject[listName] = newOrUpdatedList;
    response.status(201).end();
  }
});

const port = 9090;
app.listen(9090, () => {
  console.log(`My app is listening on port ${port}`);
});
