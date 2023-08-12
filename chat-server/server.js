process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();

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

app.get("/messages", function (request, response) {
  response.status(200).json(messages);
});
app.get("/messages/:id", function (request, response) {
  let id = Number(request.params.id);
  let message = messages.find((message) => message.id === id);
  response.status(200).send(message);
});
app.post("/messages", function (request, response) {
  let newMessage = {
    id: messages.length,
    from: request.body.from,
    text: request.body.text,
  };
  if (request.body.from && request.body.text) {
    messages.push(newMessage);
    response.json(messages);
  } else response.status(400).send("Please fill in missing details");
});
app.delete("/messages/:id", function (request, response) {
  let id = Number(request.params.id);
  let message = messages.findIndex((message) => message.id === id);
  response.json(messages.splice(message, 1));
});
app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
