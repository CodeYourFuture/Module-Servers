process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const messages = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
];
let count = 0;
//This array is our "data store".
//We will start with one message in the array.
//const messages = [welcomeMessage];

app.get("/", (req, res) => {
  console.log("you hitting root server !");
  res.sendFile(__dirname + "/index.html");
});

// get a new messages route
app.get("/messages", (req, res) => {
  res.json(messages);
});

//post server
app.use(express.urlencoded({ extended: true }));
app.post("/messages", (req, res) => {
  console.log("you are hitting post route!");
  const newMessage = req.body;
  if (newMessage.from === "" || newMessage.text === "") {
    res.status(400).send();
    console.log("status 400");
  } else {
    count++;
    const id = { id: count };
    //set the time level 5
    const timeSent = new Date().toLocaleTimeString();
    const timeObject = { timeSentAt: timeSent };
    messages.push(Object.assign(id, newMessage, timeObject));
    console.log("your message was added successfully");
    res.send("Your message was added successfully!");
    console.log(messages);
  }
});

// search by text route
// has to be tested again
app.get("/messages/latest", (req, res) => {
  console.log("you are hitting search route server !");
  const searchQuery = req.query.terms.toLowerCase();
  const filteredMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(searchQuery)
  );

  res.json({ filteredMessages });
});

//only most recent 10 messages
//not completed
app.get("/messages/latest", (req, res) => {
  console.log("you are hitting most recent 10 messages server!");
  const recentMessage = messages.slice(-10);
  res.json({ recentMessage });
});
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
// app.put("/messages/:id", (req, res) => {
//   console.log("you are hitting dynamic edit server!");
//   const idShow = req.params.id * 1;
//   const messageIndex = messages.findIndex((ele) => ele.id === idShow);
//   if (messageIndex !== -1) {
//     const { from, text } = req.body;
//     const updatedMessage = {
//       id: idShow,
//       from,
//       text,
//     };
//     messages[messageIndex] = updatedMessage;
//     res.json(updatedMessage);
//   }
// });

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
