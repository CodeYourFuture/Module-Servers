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

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("", function (request,response){
  console.log(response);
});

// Route to create a new message
app.post('/messages', (req, res) => {
  // console.log(req.body, "<----req.body")
  // Check if 'text' and 'from' properties are present and not empty
  const newMessage = req.body;
  if (!newMessage || !newMessage.text || !newMessage.from) {
    return res.status(400).json({ message: "Both text and from properties are required. " });
  }
  // const newMessage = req.body;
  newMessage.id = messages.length + 1;
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

// Route to read all messages
app.get('/messages', (req, res) => {
  // console.log(req.json, "<----req.json");
  res.json(messages);
});

// Route to read only messages whose text contains a given substring
app.get('/messages/search', (req, res) => {
  const searchText = req.query.text.toLowerCase();
  if (!searchText) {
    return res.status(400).json({ message: "Search text parameter is required." });
  }

  const filteredMessages = messages.filter(msg => msg.text.toLowerCase().includes(searchText));
  res.json(filteredMessages);
});

// Route to read one message specified by an ID
app.get('/messages/:id', (req, res) => {
  // console.log(req.params.id, "<----req.params");
  const messageId = parseInt(req.params.id);
  const message = messages.find(msg => msg.id === messageId);
  if (message) {
    res.json(message);
  } else {
    res.status(404).json({ message: "Message not found" });
  }
});

// Route to delete a message by ID
app.delete('/messages/:id', (req, res) => {
  console.log(req.params.id, "<----req.params.delete");
  const messageId = parseInt(req.params.id);
  const index = messages.findIndex(msg => msg.id === messageId);
  if (index !== -1) {
    messages.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Message not found" });
  }
});


// Route to read only the most recent 10 messages
app.get('/messages/latest', (req, res) => {
  const recentMessages = messages.slice(-10);
  res.json(recentMessages);
});


app.listen(process.env.PORT,() => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});

