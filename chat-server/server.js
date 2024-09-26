process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from 'fs';
let messagesArray = [];

fs.readFile("messsages.json", "utf-8").then((messages) => {
  messagesArray = JSON.parse(messages);

})

const app = express();
app.use(cors());
app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.send(messagesArray);
});

app.get("/messages/:messageId", (req, res) => {
  const messageId = req.params.messageId;
  const result = messagesArray.filter((message) => message.id === messageId);
  res.status(200).send({ result });
});

app.post("/messages", function (req, res) {
  const newMessage = req.body;
  messagesArray.push(newMessage);
  res.send(newMessage);
});

app.put("/messages/:id", function (req, res) {

  const newMsg = { ...req.body, ...req.params };
  const msgIndex = messagesArray.findIndex((msg) => msg.id === req.params.id);

  if (newMsg !== undefined &&
    msgIndex == req.params.id &&
    req.body.id == req.params.id) {

    messagesArray.splice(msgIndex, 1, newMsg);
    res.status(200).send(messagesArray);
  } else {
    res.status(404).send("Error in request or in the body.");
  }
});

app.delete("/messages/:messageId", function (req, res) {
  const Id = req.params.messageId;
  const result = messagesArray.find((message) => message.id === Id);
  messagesArray.splice(result, 1);
  res.status(200).send({ result });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
