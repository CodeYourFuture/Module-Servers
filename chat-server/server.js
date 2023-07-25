process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Eat my shorts!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.get("/messages/:id", (request, response) => {
  let id = Number(request.params.id);
  response.json(messages.filter((message) => message.id === id));
});

app.post("/messages", (request, response) => {
  let user = request.body.from;
  let msgText = request.body.text;

  const calculateNewID = () => {
    let newID = Math.max(...messages.map((message) => message.id)) + 1;
    return newID;
  };

  const newMessage = {
    id: calculateNewID(),
    from: user,
    text: msgText,
  };
  messages.push(newMessage);

  response.status(201).json(`"${msgText}" sent by ${user}`);
});

app.delete("/messages/:id", (request, response) => {
  const id = Number(request.params.id);

  const messageToDelete = messages.find((message) => message.id === id);

  // get the index of the message object that we want to delete
  const index = messages.indexOf(messageToDelete);

  // use splice to delete -- messages array will be mutated
  messages.splice(index, 1);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
