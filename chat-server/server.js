process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); 

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};


const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (req, res) {
  res.json(messages);
});

app.get("/messages/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === id);
  
  if (message) {
    res.json(message);
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

app.post("/messages", function (req, res) {
  const { from, text } = req.body;

  if (!from || !text) {
    res.status(400).json({ error: "Please provide both 'from' and 'text' properties" });
  } else {
    const newMessage = {
      id: messages.length,
      from,
      text,
    };
    messages.push(newMessage);
    res.status(201).json(newMessage);
  }
});

app.delete("/messages/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const index = messages.findIndex((msg) => msg.id === id);
  
  if (index !== -1) {
    messages.splice(index, 1);
    res.status(200).json({ message: "Message deleted successfully" });
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});


app.listen(process.env.PORT,() => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
