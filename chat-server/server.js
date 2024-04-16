process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(__dirname));



const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const newMessages = [
  {
    id: 1,
    from: "Peter",
    text: "Hello, CYFers!",
  },
  {
    id: 2,
    from: "Gary",
    text: "How are you?",
  }
]

//This array is our "data store".
//We will start with one message in the array.
const messages = [welcomeMessage, ...newMessages];

// GET routes

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

app.get("/messages", (request, response) => {
  response.json(messages)
});

app.get("/messages/:messageId", (request, response) => {
  const messageId = parseInt(request.params.messageId);
  const message = messages.find((message) => message.id === messageId);
  if (message) {
    response.json(message);
  } else {
    response.status(404).json("Message not found");
  }
});

// POST routes

app.post("/messages", (request, response) => {
  const newMessage = request.body;
  const { from, text } = newMessage;
  if (!from || !text) {
    response.status(400).json("Message must have a from and text");
    return;
  }

  const lastId = messages[messages.length - 1].id;
  newMessage.id = lastId + 1;
  messages.push(newMessage);

  response.sendFile(`${__dirname}/index.html`);
})

// DELETE routes

app.delete("/messages/:messageId", (request, response) => {
  const messageId = parseInt(request.params.messageId);
  const messageIndex = messages.findIndex((message) => message.id === messageId);

  if (messageIndex !== -1) {
    messages.splice(messageIndex, 1);
    response.sendStatus(204);
  } else {
    response.sendStatus(404);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});