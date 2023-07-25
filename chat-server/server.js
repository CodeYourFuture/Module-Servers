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
app.post("/messages", function (request, response) {
  const messegeFromUser = {
    id: messages.length,
    from: request.body.from,
    text: request.body.text,
  };
  messages.push(messegeFromUser);
  response.send(messages);
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

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
