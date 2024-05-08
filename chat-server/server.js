process.env.PORT = process.env.PORT || 9090;
import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";


const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

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
// let count = 0;


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.post("/messages", (req,res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.get("/messages/:id", (req, res) => {
  const messageId = Number(req.params.id);
  const filterMessages = messages.find((message) => message.id === messageId);
  res.send(filterMessages);
});

app.delete("/messages/:messageId", (req, res) => {
  const messageId = Number(req.params.messageId);
  messages = messages.filter((message) => message.id !== messageId);
  res.status(204).send();
});


app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});


