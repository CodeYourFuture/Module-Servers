process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Onur Atas",
  text: "Welcome to my chat system!",
};

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  if (!from || !text) {
    return res.status(400).json({ error: 'Both "from" and "text" fields are required.' });
  }

  const newMessage = {
    id: messages.length,
    from,
    text,
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === messageId);
  if (!message) {
    return res.status(404).json({ error: 'Message not found.' });
  }
  res.json(message);
});

app.delete("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const index = messages.findIndex((msg) => msg.id === messageId);
  if (index === -1) {
    return res.status(404).json({ error: 'Message not found.' });
  }
  messages.splice(index, 1);
  res.status(204).send();
});
app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
