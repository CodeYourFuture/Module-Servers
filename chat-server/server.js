process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
//create a new message
app.post("/messages", function (request, response) {
  let newMessage = request.body;
  messages.push(newMessage);
  console.log(
    `New message has been added ==> id: ${newMessage.id} from: ${newMessage.from} text: ${newMessage.text}`
  );
  response.json(newMessage);
});

//read all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

//Read one message specified by an ID
app.get("/messages/:id", function (request, response) {
  let idToFind = request.params.id;
  const messageToFind = messages.find((el) => el.id == parseInt(idToFind));
  if (messageToFind) {
    response.json(messageToFind);
  } else {
    response.json(`Message with id ${idToFind} not found!`);
  }
});

// Delete a message, by ID
app.delete("/messages/:id", function (request, response) {
  let messageIdToDelete = request.params.id;
  let messageIndex = messages.findIndex(
    (el) => el.id == parseInt(messageIdToDelete)
  );
  if (messageIndex !== -1) {
    messages.splice(messageIndex, 1);
    response.send(`The message with ID ${messageIdToDelete} has been deleted!`);
  } else {
    response.send(`Message with ID ${messageIdToDelete} not found!`);
  }
});
app.listen(port, () => {
  console.log(`listening on PORT ${port}...`);
});
