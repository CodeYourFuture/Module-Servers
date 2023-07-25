process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser.json());
app.use(cors());

// [ ] All message content should be passed as JSON.
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

//- [ ] Read all messages
app.get("/messages", function (request, response) {
  response.send(messages);
});

//[ ] Create a new message
//[ ] _reject_ requests to create messages if the message objects have an empty or missing `text` or `from` property.
//[ ] In this case your server should return a status code of `400`.

app.post("/messages", function (request, response) {
  if (request.body.from.length > 0 && request.body.text.length > 0) {
    const messegeFromUser = {
      id: messages.length,
      from: request.body.from,
      text: request.body.text,
    };

    messages.push(messegeFromUser);
    response.send(messages);
  } else {
    // throw new Error("Error, all fields must be filled");
    response.status(400).send("Error, all fields must be filled!");
  }
});

//- [ ] Read one message specified by an ID
app.get("/messages/:id", function (request, response) {
  const id = Number(request.params.id);
  const searched = messages.filter((msg) => msg.id === id);
  console.log(searched);
  response.send(searched);
});

//  [ ] Delete a message, by ID
app.delete("/messages/:id", function (request, response) {
  const id = Number(request.params.id);
  const indexToDelete = messages.findIndex((msg) => msg.id === id);
  if (indexToDelete !== -1) {
    messages.splice(indexToDelete, 1);
  }
  response.send(messages);
});

//[error ] Read _only_ messages whose text contains a given substring: `/messages/search?text=express`
//[not yet ] Read only the most recent 10 messages: `/messages/latest`

app.get("/messages/search", function (request, response) {
  let searchTerm = request.query.text;
  console.log("searchTerm:", searchTerm);

  let filteredMsgs = messages.filter(
    (msg) =>
      msg.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  response.json(filteredMsgs);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
