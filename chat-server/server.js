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

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const welcomeMessage2 = {
  id: 1,
  from: "test",
  text: "test",
};

let lastId = 1;

//This array is our "data store".
//We will start with one message in the array.

const messages = [welcomeMessage, welcomeMessage2];

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

// Get all messages
app.get("/messages", (req, res) => {
  res.send(messages);
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
  console.log(req);
  const message = {
    id: newId,
    from: req.body.from,
    text: req.body.text,
  };
  lastId = newId;
  messages.push(message);
  res.status(201).json(message);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});

