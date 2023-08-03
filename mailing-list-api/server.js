process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json()); // needed to parse JSON data
server.use(cors()); // middleware for security - makes Express.js backend accessible to frontend applications running on different domains, while still following CORS security rules

const mailingListObject = require("./mailing-lists");

server.get("/", function (request, response) {
  response.send("Mailing list server");
});

server.get("/lists", function (request, response) {
  let mailingListKeys = Object.keys(mailingListObject);
  if (mailingListKeys) {
    response.status(200).send(mailingListKeys);
    // response.status(200).send(JSON.stringify(mailingList)); // HELP!! Instructions say response should be "a JSON body of all the existing list names". Do I need to stringify?
  } else {
    response.status(200).send([]);
  }
});

server.get("/lists/:name", function (request, response) {
  const nameSearch = request.params.name;
  console.log(request.params.name);

  const foundList = mailingListObject[nameSearch]; // find nameSearch key in mailingListObject
  if (foundList) {
    response
      .status(200)
      .send("List Name: " + nameSearch + "\n" + " List Emails: " + foundList); // HELP!! How to make the answer into a key,value pair?
  } else {
    response.status(404).json("List not found");
  }
});

server.delete("/lists/:name", function (request, response) {
  const nameDelete = request.params.name;
  const foundName = mailingListObject[nameDelete];

  if (foundName) {
    delete mailingListObject[foundName]; // .splice does not work on objects
    response.status(200).send(mailingListObject); // HELP!! Why is this not working?
  } else {
    response.status(404).json({ message: "List not found." });
  }
});

// PUT - update single list // HELP!! Only use PUT or POST and PUT?
// /lists/:name - add or update a list with the given name
// Response
// 200 if it updated a list that already existed
// 201 if it created a new list

server.put("/lists/:name", function (request, response) {
  // update existing
  const listName = request.params.name;
  const updatedList = request.body;

  const foundList = mailingListObject[listName]; // HELP! Lost.
  if (foundList) {
    response.status(200).send("Updated");
  } else {
    response.status(201).json("New list created"); // Do I have to go to server.post here?
  }
});

server.post("/lists/:name", function (request, response) {
  // add new list
});

const listener = server.listen(process.env.PORT, function () {
  console.log("Server is listening on port " + listener.address().port);
});
