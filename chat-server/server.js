const port = 9090;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const welcomeMessage = {
  id: 0,
  sender: "Hussein",
  content: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (req, res) {
  res.json(messages);
});

app.get("/messages/:id", function (req, res) {
  const id = Number(req.params.id);
  const message = messages.find((msg) => msg.id === id);
  if (message) {
    res.json(message);
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

app.post("/messages", function (req, res) {
  const newMsg = req.body;
  if (!newMsg || !newMsg.sender || !newMsg.content) {
    res.status(400).json({ error: "Invalid message format" });
  } else {
    const nextId = messages.length;
    const msgWithId = { id: nextId, ...newMsg };
    messages.push(msgWithId);
    res.status(201).json(msgWithId);
  }
});

app.delete("/messages/:id", function (req, res) {
  const id = Number(req.params.id);
  const index = messages.findIndex((msg) => msg.id === id);
  if (index !== -1) {
    messages.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
});
