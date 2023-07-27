process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const _ = require("lodash");

const app = express();

app.use(cors());
app.use(express.json()); // to process the body - from HTML form (see cheat sheet: Accessing request.body in a POST request)
app.use(express.urlencoded({ extended: true })); // same ^ but from fetch (e.g. in React), or from Postman

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
let messageIdCounter = 1;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.status(200).send(messages);
});

app.get("/messages/latest", function (request, response) {
  const latestMessages = _.takeRight(messages, 10); // same as -> messages.slice(-10);
  response.status(200).send(latestMessages);
});

app.get("/messages/:id", function (request, response) {
  const messageIdSearch = parseInt(request.params.id);
  console.log(request.params.id);
  const foundMessage = messages.find(
    (message) => message.id === messageIdSearch
  );
  response.status(200).send(foundMessage);
});

app.get("/messages/search", function (request, response) {
  const searchQuery = request.query.term.toLowerCase();
  const filteredMessages = messages.filter((messageObject) =>
    messageObject.message.toLowerCase().includes(searchQuery)
  );
  response.status(200).send(filteredMessages);
});

app.post("/messages", function (request, response) {
  let newMessage = request.body;
  newMessage.id = messageIdCounter++;

  if (
    _.isString(newMessage.from) &&
    _.isString(newMessage.text) &&
    newMessage.from.length > 0 &&
    newMessage.text.length > 0
  ) {
    messages.push({
      id: newMessage.id,
      from: newMessage.from,
      text: newMessage.text,
    });
    response.status(201).json(newMessage);
  } else {
    response.json({
      error: "Invalid Input",
    });
  }
});

app.delete("/messages/:id", function (request, response) {
  const messageIdDelete = parseInt(request.params.id); // the id is taken from the url and is a string so it needs to be parsed to an integer for a strict comparison to work
  const foundMessage = messages.findIndex(
    (message) => message.id === messageIdDelete
  );
  if (foundMessage >= 0) {
    messages.splice(foundMessage, 1);
    response.json(messages);
  } else {
    response.json({ message: "Message not found." });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
