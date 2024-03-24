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
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

let messages = [welcomeMessage];
let count = -1;

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages/:messageId", (req, res) => {
  const messageId = Number(req.params.messageId);
  const filterMessages = messages.find((message) => message.id === messageId);
  res.send(filterMessages);
});

app.use(express.urlencoded({ extended: true }));
app.post("/messages", (req, res) => {
  const newMessage = req.body;
  if (newMessage.from === "" || newMessage.text === "") {
    res.status(400);
  } else {
    count++;
    const id = { id: count };
    messages.push(Object.assign(id, newMessage));
    res.send("Your message was added successfully!");
  }
});

app.delete("/messages/:messageId", (req, res) => {
  const messageId = Number(req.params.messageId);
  messages = messages.filter((message) => message.id !== messageId);
  res.status(204).send();
});

// // Searchterm queries

// app.get("/quotes/search", (req, res) => {
//   const searchTerm = req.query.term.toLowerCase();
//   const filterMessages = messages.filter(
//     (message) =>
//       message.text.toLowerCase().includes(searchTerm) ||
//       message.from.toLowerCase().includes(searchTerm)
//   );
//   const sendFilter = searchTerm ? filterMessages : [];
//   res.send(sendFilter);
// });

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
