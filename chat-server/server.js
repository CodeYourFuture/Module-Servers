process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const messages = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 1,
    from: "Bedi",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 2,
    from: "Amy",
    text: "Welcome to CYF chat system!",
  }
];

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.


app.post("/messages", function (request, response) {
  const newMessage = request.body;

  if (!newMessage || !newMessage.text || !newMessage.from) {
    return response.status(400).send({ error: "Invalid message data" });
  }
  messages.push(newMessage);
  response.status(201).send({ newMessage });
});

app.get("/messages", function (request, response) {
  response.send(messages);
});

app.get("/messages/:id", function (request, response) {
  const messageId = parseInt(request.params.id);
  const message = messages.find((msg) => msg.id === messageId);
  if (!message) {
    console.log("Message not found"); 
    return response.status(404).send({ error: "Message not found" });
  }
  response.send(message);
});

app.delete("/messages/:id", function (req, res) {
  const messageId = parseInt(req.params.id);
  const messageIndex = messages.findIndex((msg) => msg.id === messageId);

  const deletedMessage = messages.splice(messageIndex, 1)[0];
  res.send(deletedMessage);
});

app.listen(process.env.PORT,() => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
