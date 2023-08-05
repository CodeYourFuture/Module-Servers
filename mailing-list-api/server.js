process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

let corsOptions = {
  origin: "localhost", // Compliant
}; //netlify URL goes here

let app = express();
app.use(cors(corsOptions));

const server = express();
server.disable("x-powered-by");

server.use(express.json()); // needed to parse JSON data
server.use(cors()); // middleware for security - makes Express.js backend accessible to frontend applications running on different domains, while still following CORS security rules

const mailingListObject = require("./mailing-lists");

server.get("/", function (request, response) {
  response.send("Mailing list server");
});

server.get("/lists", function (request, response) {
  let mailingListKeys = Object.keys(mailingListObject);
  if (mailingListKeys) {
    response.status(200).json(mailingListKeys);
    // response.status(200).send(JSON.stringify(mailingList)); // both are correct
  } else {
    response.status(200).json([]);
  }
});

server.get("/lists/:name", function (request, response) {
  const nameSearch = request.params.name;
  console.log(request.params.name);

  const foundList = mailingListObject[nameSearch]; // find nameSearch key in mailingListObject
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

server.delete("/lists/:name", function (request, response) {
  const nameDelete = request.params.name;
  const foundName = mailingListObject[nameDelete];

  if (foundName) {
    delete mailingListObject[foundName]; // .splice does not work on objects
    response.status(200).json(mailingListObject); // HELP!! Why is this not working?
  } else {
    response.status(404).json({ message: "List not found." });
  }
});

server.put("/lists/:name", function (request, response) {
  const listName = request.params.name;
  const newOrUpdatedList = request.body;

  const foundList = mailingListObject[listName];
  if (foundList) {
    // if list is found in object, update the existing
    mailingListObject[listName] = newOrUpdatedList;
    response.status(200).end();
  } else {
    // if list is NOT found in object, create new
    mailingListObject[listName] = newOrUpdatedList;
    response.status(201).end();
  }
});

const listener = server.listen(process.env.PORT, function () {
  console.log("Server is listening on port " + listener.address().port);
});
