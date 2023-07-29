process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date()
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


// get all messages

app.get("/messages", function (request, response) {
  response.json({ messages });
});

// get messages that contains a word in the text (eg. express)

function getMatchingMessageByText(text) {
  return messages.filter((message) => message.text.toLowerCase().indexOf(text) >= 0);
}

app.get("/messages/search", (req, res) => {
  const searchQuery = req.query.text;
  console.log(searchQuery, "<---searchQuery");
  const matchingMessage = getMatchingMessageByText(searchQuery);
  console.log(matchingMessage, "<---matching message");
  res.json(matchingMessage);
});

// get latest 10 messages

app.get("/messages/latest", (req, res) => {
  res.json(messages.slice(-10));
})

/*
Level 2 - simple validation
For this level, your server must:
 reject requests to create messages if the message objects have an empty or missing text or from property.
 In this case your server should return a status code of 400.
(Advanced note: people don't actually agree on the best status code for this situation.)
*/

app.post("/messages", function (request, response) {
  const newMessage = request.body;
  console.log(newMessage.from, "<--- newMessage.from");
  console.log(typeof newMessage.id, "<--- newMessage.id");
  console.log(typeof newMessage.from, "<--- newMessage.from");
  console.log(typeof newMessage.text, "<--- newMessage.text");
  console.log(newMessage.from !== "", "<--- newMessage.from not empty string");
  if (newMessage.from !== "" && newMessage.text !== "") {
    newMessage.timeSent = new Date();
    messages.push(newMessage);
    response.send({ messages });
  } else {
    response.status(400);
    response.send("Please provide the missing information");
  }
});


// Find one message specified by an ID using params

app.get("/messages/:id", function (request, response) {
  const messageId = Number(request.params.id);
  console.log(messageId);
  const messageWithMatchingId = messages.find(
    (message) => message.id === messageId
  );
  console.log(messageWithMatchingId);
  response.json({ messageWithMatchingId });
});

// Delete one message specified by an ID using params

app.delete("/messages/:id", (request, response) => {
  const messageId = Number(request.params.id);
  const messageWithMatchingId = messages.find(
    (message) => message.id === messageId
  );
  const indexOfMessageToBeDeleted = messages.indexOf(messageWithMatchingId);
  messages.splice(indexOfMessageToBeDeleted, 1);
  response.status(200).json({ messages });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
