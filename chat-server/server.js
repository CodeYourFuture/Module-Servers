process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
const messages = [welcomeMessage];

app.post("/messages", (req, res) => {
  const { from, text } = req.body;

  const newMessage = {
    id: messages.length,
    from,
    text,
  };
  messages.push(newMessage);
  res.json(newMessage);
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);

  const message = messages.find((msg) => msg.id === messageId);
  if (message) {
    res.json(message);
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

app.delete("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const index = messages.findIndex((msg) => msg.id === messageId);

  if (index !== -1) {
    messages.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
