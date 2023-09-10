const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 9090;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();
app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// Get all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

// Add a new message
app.post("/messages", function (request, response) {
  const { from, text } = request.body;
  const newMessage = {
    id: messages.length,
    from,
    text,
  };
  messages.push(newMessage);
  response.json(newMessage);
});

// Find message by ID
app.get("/messages/:id", function (request, response) {
  const idShow = request.params.id * 1;
  const message = messages.find((ele) => ele.id === idShow);
  response.json(message);
});

// Delete message by ID
app.delete("/messages/:id", function (request, response) {
  const idShow = request.params.id * 1;
  const messageIndex = messages.findIndex((ele) => ele.id === idShow);
  if (messageIndex !== -1) {
    messages.splice(messageIndex, 1);
    response.json({ message: "Message deleted successfully." });
  }
});

// Edit message by ID
app.put("/messages/:id", function (request, response) {
  const idShow = request.params.id * 1;
  const messageIndex = messages.findIndex((ele) => ele.id === idShow);
  if (messageIndex !== -1) {
    const { from, text } = request.body;
    const updatedMessage = {
      id: idShow,
      from,
      text,
    };
    messages[messageIndex] = updatedMessage;
    response.json(updatedMessage);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on PORT http://${HOST}:${PORT}`);
});
