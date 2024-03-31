process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const welcomeMessage = {
  id: 0,
  from: "Marcus",
  text: "Welcome to my Chat System!",
};

let messages = [welcomeMessage];
let count = 0;

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages/search", (req, res) => {
  const searchTerm = req.query.text.toLowerCase();
  const filterMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(searchTerm)
  );
  res.send(filterMessages);
});

app.get("/messages/latest", (req, res) => {
  const lastTenMessages = messages.slice(messages.length - 10);
  res.send(lastTenMessages);
});

app.get("/messages/:id", (req, res) => {
  const messageId = Number(req.params.id);
  const filterMessages = messages.find((message) => message.id === messageId);
  res.send(filterMessages);
});

app.put("/messages/:id", (req, res) => {
  const findIndex = messages.findIndex(
    (message) => message.id === Number(req.params.id)
  );
  const newMessage = { ...messages[findIndex], ...req.body };
  messages.splice(findIndex, 1, newMessage);
  res.status(200).send({ success: true });
});

app.use(express.urlencoded({ extended: true }));
app.post("/messages", (req, res) => {
  const newMessage = req.body;
  if (newMessage.from === "" || newMessage.text === "") {
    res.status(400);
  } else {
    count++;
    const id = { id: count };
    const currentTime = new Date().toLocaleTimeString();
    const timeKeyValue = { timeSent: currentTime };
    messages.push(Object.assign(id, newMessage, timeKeyValue));
    res.send("Your message was added successfully!");
  }
});

app.delete("/messages/:messageId", (req, res) => {
  const messageId = Number(req.params.messageId);
  messages = messages.filter((message) => message.id !== messageId);
  res.status(204).send();
});

// // Searchterm queries

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
