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
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json({ messages });
});

app.post("/messages", function (request, response) {
  const newMessage = request.body;
  console.log(request.body);
  console.log(newMessage);
  messages.push(newMessage);
  response.send({ messages });
});

// Find one message specified by an ID using query

function getMatchingMessage(idNum) {
  console.log(idNum, "<--- idNum");
  console.log(typeof idNum);
  return messages.filter((message) => message.id === idNum);
}

app.get("/messages/id", (request, response) => {
  const idQuery = Number(request.query.number);
  console.log(idQuery, "<--- idQuery");
  const matchingMessage = getMatchingMessage(idQuery);
  console.log(matchingMessage);
  response.json(matchingMessage)
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
  const messageWithMatchingId = messages.find((message) => message.id === messageId);
  const indexOfMessageToBeDeleted = messages.indexOf(messageWithMatchingId);
  messages.splice(indexOfMessageToBeDeleted, 1);
  response.status(200).json({ messages })
});


app.listen(process.env.PORT,() => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
