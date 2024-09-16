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

//read all messages
app.get("/messages",(req, res) => {
  res.send(messages);
})

//get messages by id
app.get("/messages/:id", (req,res) => {
  const messageID = Number(req.params.id);
  const message = messages.find((message) => message.id === messageID);
  res.send(message);
})

//create new messages
app.post("/messages", (req,res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  res.send(newMessage);
})

//delete messages by id
app.delete("/messages/:id", (req,res) => {
  const messageID = Number(req.params.id);
  const index = messages.findIndex((message) => message.id === messageID);
  messages.splice(index, 1);
  res.send();
})

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
