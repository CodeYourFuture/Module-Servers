const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Starting message
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date().toUTCString(),
};
const welcomeMessage1 = {
  id: 1,
  from: "Lisa",
  text: "Hello to CYF chat system!",
  timeSent: new Date().toUTCString(),
};
const welcomeMessage2 = {
  id: 2,
  from: "Homer",
  text: "Douh!",
  timeSent: new Date().toUTCString(),
};

const messages = [welcomeMessage, welcomeMessage1, welcomeMessage2];

// Serving index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Read all messages that contain a given substring
app.get("/messages/search/", (req, res) => {
  const searchText = req.query.text;
  if (!searchText) {
    return res.json(messages);
  }
  const filteredMessages = messages.filter((message) =>
    message.text.includes(searchText)
  );
  res.json(filteredMessages);
});

// Read the latest 10 messages
app.get("/messages/latest", (req, res) => {
  const latestMessages = messages.slice(-10);
  res.json(latestMessages);
});

// Create a new message
app.post("/messages", (req, res) => {
  const newMessage = {
    id: messages[messages.length - 1].id + 1,
    from: req.body.from,
    text: req.body.text,
    timeSent: new Date().toUTCString(),
  };
  messages.push(newMessage);
  if (
    !newMessage.from ||
    !newMessage.text ||
    newMessage.from.trim() === "" ||
    newMessage.text.trim === ""
  ) {
    return res.status(400).send("Please enter a valid message");
  }
});

// Read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find((message) => message.id === id);
  if (message) {
    res.json(message);
  } else {
    res.status(404).send();
  }
});

// Update a message by ID
app.put("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find((message) => message.id === id);
  if (message) {
    // Update message properties based on request body
    if (req.body.from !== undefined) {
      message.from = req.body.from;
    }
    if (req.body.text !== undefined) {
      message.text = req.body.text;
    }
    // Do not update timeSent property if it is passed back from client
    if (req.body.timeSent === undefined) {
      message.timeSent = new Date().toUTCString();
    }
    res.json(message);
  } else {
    res.status(404).send();
  }
});

// Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = messages.findIndex((message) => message.id === id);
  if (index !== -1) {
    messages.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
