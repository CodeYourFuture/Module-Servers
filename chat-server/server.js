process.env.PORT = process.env.PORT || 9090;
import express, { json } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//This array is our "data store".
//We will start with one message in the array.

const messages = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
    timeSent: new Date(),
  },
  {
    id: 1,
    from: "test",
    text: "test",
    timeSent: new Date(),
  },
];

let lastId = 1;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Get all messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

//Level 3 - more "read" functionality

app.get("/messages/search", (req, res) => {
  console.log("here");
  const searchText = req.query.text;
  if (!searchText) {
    return res.status(400).json({ message: "Please provide a 'text' query parameter" });
  }
  const filteredMessages = messages.filter((message) => message.text.includes(searchText));
  res.json(filteredMessages);
});

app.get("/messages/latest", (req, res) => {
  const latestMessages = messages.slice(-10);
  res.json(latestMessages);
});

// GET a specific message by id
app.get("/messages/:id", (req, res) => {
  const message = messages.find((p) => p.id === parseInt(req.params.id));
  if (!message) return res.status(404).json({ message: "Message not found" });
  res.json(message);
});

// POST a new message

app.post("/messages", (req, res) => {
  const newId = (lastId += 1);
  if (!req.body.from) return res.status(422).json({ message: "From field is required" }); //A 422 status code indicates that the server was unable to process the request because it contains invalid data.
  if (!req.body.text) return res.status(422).json({ message: "Text field is required" });

  const timeSent = new Date(); // Adding timestamp
  const message = {
    id: newId,
    from: req.body.from,
    text: req.body.text,
    timeSent: timeSent,
  };
  lastId = newId;
  messages.push(message);
  res.status(201).json(message);
});

// DELETE a message

app.delete("/messages/:id", (req, res) => {
  const index = messages.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Message not found" });

  messages.splice(index, 1);
  res.json({ message: "Message deleted" });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
