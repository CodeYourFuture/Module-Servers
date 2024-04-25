process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(cors());

// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
const messages = [welcomeMessage];

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  res.send("Message added");
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find((obj) =>  obj.id === messageId );
  if (!message) return res.status(404).json({ message: "Message does not exist" });
  res.json(message);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
