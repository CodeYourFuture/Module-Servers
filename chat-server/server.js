const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const welcomeMessage = {
  id: 0,
  from: "Junita",
  text: "Welcome to my chat server!",
};

let nextMsgId = 1;

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//send messages

app.post("/messages", function (request, response) {
  const time = new Date().toLocaleTimeString();
  let newMessage = {
    id: messages.length,
    from: request.body.from,
    text: request.body.text,
    timeSent: time,
  };

  if (request.body.from && request.body.text) {
    messages.push(newMessage);
    // response.json(messages);
  } else response.status(400).send("Please check all details");
});
//read all messages

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.get("/messages/:id", function (request, response) {
  const idToFind = Number(request.params.id);
  const message = messages.find((message) => message.id === idToFind);
  console.log(message);
  response.json(message);
});

//delete  messages
app.delete("/messages/:id", function (request, response) {
  const id = Number(request.params.id);
  const numberId = messages.findIndex((message) => message.id === id);
  if (!numberId) {
    response.status(400).send("Please check ID");
  } else {
    response.json(messages.splice(numberId, 1));
  }
});

//latest messages

app.get("/messages/latest", (req, res) => {
  let result = messages.slice(-10);
  res.json(result);
});

app.get("/messages/search", (req, res) => {
  let result = messages.filter((msg) =>
    msg.text.toLowerCase().includes(req.query.text)
  );
  res.send(result);
});

app.listen(3000);
