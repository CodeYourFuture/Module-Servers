process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response, next) {
  response.sendFile(__dirname + "/index.html");
});

let nextMessageId = 1;

app.post("/messages", function (request, response) {
  const newMessage = {
    id: nextMessageId++,
    from: request.body.from,
    text: request.body.text,
  };
  try {
    if (!request.body.from || !request.body.text) {
      throw new Error("Unable to add a message");
    } else {
      messages.push(newMessage);
      response.json(newMessage);
    }
  } catch (error) {
    console.log(error);
    response.status(400);
  }

  
  response.json({message: "Something went wrong"});
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.get("/messages/:id", function (request, response) {
  const messageId = parseInt(request.params.id);
  const message = messages.find((singleMsg) => singleMsg.id === messageId);

  if (!message) {
    response.status(404).json({ error: "Message not found." });
  } else {
    response.json(message);
  }
});

app.delete("/messages/:id", function (request, response) {
  const messageId = parseInt(request.params.id);
  const singleMessage = messages.find(
    (singleMsg) => singleMsg.id === messageId
  );
  if (singleMessage) {
    messages.splice(singleMessage, 1);
  }
  response.send(messages);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
