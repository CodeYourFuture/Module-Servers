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

const usersChat = [];
// const jsonCreator=(msg)={
//   const message={
//     id:,
//     messages:msg,
//     from:'Ali'
//   }
// }

app.post("/messages", (req, res) => {
  const chatData = req.body;
  usersChat.push(chatData);
  res.send("Chat added !");
});

app.get("/messages", (req, res) => {
  res.send(usersChat);
});

const findMessageById = (arr, msgId) => {
  return arr.filter((obj) => obj.id === Number(msgId));
};

app.get("/messages/:id", (req, res) => {
  const msgId = req.params.id;
  console.log(msgId);
  const findedMsg = findMessageById(usersChat, msgId);
  res.send(findedMsg);
});

app.delete("/messages/:id", (req, res) => {
  const msgId = req.params.id;
  const findedMsg = findMessageById(usersChat, msgId);
  const index = usersChat.indexOf(findedMsg[0]);
  usersChat.splice(index, 1);
  res.send("Message deleted !");
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
