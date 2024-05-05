process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

function validateMessage(newMessage) {
  return !(
    !newMessage.hasOwnProperty("text") ||
    !newMessage.hasOwnProperty("from") ||
    newMessage.from === "" ||
    newMessage.text === "" ||
    typeof newMessage.text != "string" ||
    typeof newMessage.from != "string"
  );
}

//This array is our "data store".
//We will start with one message in the array.
const messages = [welcomeMessage];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/messages", (req, res) => {
  const newMessage = req.body;

  if (!validateMessage(newMessage)) return res.status(400).send("wrong input");

  newMessage["id"] = messages[messages.length - 1].id + 1;
  newMessage["timeSent"] = new Date();
  messages.push(newMessage);
  res.json(messages);
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/messages/id/:id", (req, res) => {
  const messageId = req.params.id;
  const searchedMessage = messages.find((message) => message.id == messageId);
  res.json(searchedMessage);
});

app.delete("/messages/id/:id", (req, res) => {
  const messageId = req.params.id;
  const deleteMessage = messages.find((message) => message.id == messageId);
  messages.splice(messages.indexOf(deleteMessage), 1);
  res.json(messages);
});

app.get("/messages/search", (req, res) => {
  const searchInput = req.query.text.toLowerCase();
  const filteredMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(searchInput)
  );
  res.json(filteredMessages);
});

app.get("/messages/latest/:length", (req, res) => {
  const length = req.params.length;
  const latestMessages = messages.slice(-length);
  res.json(latestMessages);
});

app.patch("/messages/id/:id", (req, res) => {
  console.log(req.params.id);
  const messageId = req.params.id;
  const updatedInfo = req.body;
  const patchMessage = messages.find((message) => message.id == messageId);
  messages[messages.indexOf(patchMessage)] = {
    ...messages[messages.indexOf(patchMessage)],
    ...updatedInfo,
  };
  res.json(messages);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
