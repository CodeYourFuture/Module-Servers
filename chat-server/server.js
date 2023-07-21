process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

// Endpoint to serve the main page
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// Endpoint to create a new message
app.post("/messages", function (request, response) {
  const newMessage = request.body;
  newMessage.id = messages.length;
  messages.push(newMessage);
  response.json(newMessage);
});

// Endpoint to read all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

// Endpoint to read one message specified by an ID
app.get("/messages/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const message = messages.find((m) => m.id === id);

  if (message) {
    response.json(message);
  } else {
    response.status(404).send("Message not found");
  }
});

// Endpoint to delete a message, by ID
app.delete("/messages/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const index = messages.findIndex((m) => m.id === id);

  if (index !== -1) {
    messages.splice(index, 1);
    response.send("Message deleted");
  } else {
    response.status(404).send("Message not found");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
