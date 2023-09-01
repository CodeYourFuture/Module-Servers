const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 9090;

app.use(cors());
app.use(express.json());

const messages = [
  {
    id: 0,
    from: "Jeremy",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 1,
    from: "Wasilota",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 2,
    from: "Chama",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 3,
    from: "Moses",
    text: "Welcome to CYF chat system!",
  }
];

app.post("/message", function (req, res) {
  const newMessage = req.body;

  if (!newMessage || !newMessage.text || !newMessage.from) {
    return res.status(400).send({ error: "Invalid message data" });
  }
  messages.push(newMessage);
  res.status(201).send({ newMessage });
});
app.get("/", function (req, res) {res.send(messages)});
app.get("/messages", function (req, res) {
  res.send(messages);
});

app.get("/messages/:id", function (req, res) {
  const messageId = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === messageId);
  if (!message) {
    console.log("Message not found"); 
    return res.status(404).send({ error: "Message not found" });
  }
  res.send(message);
});

app.delete("/messages/:id", function (req, res) {
  const messageId = parseInt(req.params.id);
  const messageIndex = messages.findIndex((msg) => msg.id === messageId);

  const deletedMessage = messages.splice(messageIndex, 1)[0];
  res.send(deletedMessage);
});

app.get("/messages/search", function (req, res) {
  const searchSubtring = req.query.text;

  if (!searchSubtring) {
    return res.status(400).send({ error: "Missing search text" });
  }

  const matchingMessages = messages.filter((msg) =>
    msg.text.toLowerCase().includes(searchSubtring.toLowerCase())
  );

  res.send(matchingMessages);
});

app.get("/messages/latest", function (req, res) {
  const recentMessages = messages.slice(-10);

  res.send(recentMessages);
});

app.listen(port, () => {
  console.log(`listening on PORT ${port}...`);
});