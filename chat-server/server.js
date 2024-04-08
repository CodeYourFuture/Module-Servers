process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const welcomeMessage = {
  "id": "0",
  from: "Adniya",
  text: "Welcome to Adniya chat system!",
  time:"15:34:22"
};

const messagesArray = [welcomeMessage];

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
  res.send(newMessage );
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
