const express = require("express");
const cors = require("cors");

const app = express();
// const port = process.env.PORT;
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

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//create a new message
app.post("/messages", function (request, response) {
  let newMessage = request.body;
  //simple validation
  if (!newMessage.text || !newMessage.from) {
    response.status(400).json({ error: "Missing text or from property" });
  }
  messages.push(newMessage);
  response.json(newMessage);
});

//read all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

//Level 3 - more "read" functionality

// Read only messages whose text contains a given substring
app.get("/messages/search", function (request, response) {
  let searchedQuery = request.query.text.toLowerCase();
  let searchResults = messages.filter((message) =>
    message.text.toLowerCase().includes(searchedQuery)
  );
  response.json(searchResults);
});

//Read only the most recent 10 messages
app.get("/messages/latest", function (request, response) {
  let lastTenMessages = messages.slice(-10);
  response.send(lastTenMessages);
});

//Read one message specified by an ID
app.get("/messages/:id", function (request, response) {
  let idToFind = request.params.id;
  const messageToFind = messages.find((el) => el.id == parseInt(idToFind));
  if (messageToFind) {
    response.json(messageToFind);
  } else {
    response.json({ error: `Message with id ${idToFind} not found!` });
  }
});

// Delete a message, by ID
app.delete("/messages/:id", function (request, response) {
  let messageIdToDelete = request.params.id;
  let messageIndex = messages.findIndex(
    (el) => el.id == parseInt(messageIdToDelete)
  );
  if (messageIndex !== -1) {
    messages.splice(messageIndex, 1);
    response.send(`The message with ID ${messageIdToDelete} has been deleted!`);
  } else {
    response.send({ error: `Message with ID ${messageIdToDelete} not found!` });
  }
});

// app.listen(port, () => {
//   console.log(`listening on PORT ${port}...`);
// });

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
