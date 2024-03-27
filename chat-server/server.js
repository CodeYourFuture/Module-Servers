process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());

// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const messages = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//const messages = [welcomeMessage];

app.get("/", (req, res) => {
  console.log("you hitting root server !");
  res.sendFile(__dirname + "/index.html");
});

//new server hep kita
app.get("/messages", (req, res) => {
  res.json(messages);
});

//marcus post code
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
    console.log(messages);
  }
});

// Add a new message
app.post("/messages", (req, res) => {
  console.log("you are hitting post server !");
  const myMessages = req.body;
  messages.push(myMessages);
  res.status(201).send({ newMovies: myMessages });
});

// app.post("/messages", (req, res) => {
//   console.log("you are hitting post server !");
//   const { from, text } = req.body;
//   const newMessage = {
//     id: messages.length,
//     from,
//     text,
//   };
//   messages.push(newMessage);
//   res.json(newMessage);
// });

// Find message by ID
app.get("/messages/:id", (req, res) => {
  console.log("you are hitting find dynamic server!");
  const idShow = req.params.id * 1;
  const message = messages.find((ele) => ele.id === idShow);
  res.send({ message });
});

// Delete message by ID
app.delete("/messages/:id", (req, res) => {
  console.log("you are hitting dynamic delete server !");
  const idShow = req.params.id * 1;
  const messageIndex = messages.findIndex((ele) => ele.id === idShow);
  if (messageIndex !== -1) {
    messages.splice(messageIndex, 1);
    res.json({ message: "Message deleted successfully." });
  }
});

// Edit message by ID
app.put("/messages/:id", (req, res) => {
  console.log("you are hitting dynamic edit server!");
  const idShow = req.params.id * 1;
  const messageIndex = messages.findIndex((ele) => ele.id === idShow);
  if (messageIndex !== -1) {
    const { from, text } = req.body;
    const updatedMessage = {
      id: idShow,
      from,
      text,
    };
    messages[messageIndex] = updatedMessage;
    res.json(updatedMessage);
  }
});

// app.listen(PORT, () => {
//   console.log(`Listening on PORT http://${HOST}:${PORT}`);
// });
app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
