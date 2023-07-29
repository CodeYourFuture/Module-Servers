process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const { response, request } = require("express");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const welcomeMessage = {
  id: 1,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [];
messages.push(welcomeMessage);

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (request, response) => {
  response.json(messages);
});

app.get("/messages/:id", (request, response) => {
  const search = Number(request.params.id);
  const messageWithSpecificId = messages.find((e) => e.id === search);
  response.json(messageWithSpecificId);
});

app.delete("/messages/:id", (request, response) => {
  const newMessageId = messages.findIndex(
    (e) => e.id === Number(request.params.id)
  );
  if (newMessageId >= 0) {
    response.json(messages.splice(newMessageId, 1));
  }
});

app.post("/messages", (request, response) => {
  const newMessage = {
    id: messages.length + 1,
    from: request.body.from,
    text: request.body.text,
  };
  if (newMessage.from.trim() === "" || newMessage.text.trim() === "") {
    response.sendStatus(400)
  } else {
    messages.push(newMessage);
    response.send(messages);
  }
  
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
