process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
// const bodyParser = require("body-parser");
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

// START
app.get("/messages/search", function (req, res) {
  let searchedText = req.query.text;
  let matchingText = textMessageSearch(searchedText);
  res.send(matchingText);
});

function textMessageSearch(searchedText) {
  return messages.filter((message) =>
    message.text.toLowerCase().includes(searchedText.toLowerCase())
  );
}

//get message by id

app.get("/messages/:id", function (req, res) {
  const findMsgById = parseInt(req.params.id);
  if (isNaN(findMsgById)) {
    // console.log("NaN");
    res.status(400).send();
  } else {
    const message = messages.find((message) => message.id === findMsgById);
    res.json({ message });
  }
});

// get all messages

app.get("/messages", function (req, res) {
  res.json({ messages });
});

// Delete a msg by id

app.delete("/messages/:id", function (req, res) {
  const findId = parseInt(req.params.id);
  const findIndexId = messages.findIndex((message) => message.id === findId);
  if (findIndexId === -1) {
    res.status(404).send({ message: "message not found" });
    return;
  }

  messages.splice(findIndexId, 1);
  res.sendStatus(204); // no content
});

// Create a message
app.post("/messages", function (req, res) {
  const newMessage = req.body;
  messages.push(newMessage);
  res.status(201).send({ newMessage });
});

//messages whose text contains a given substring:

// END
//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
