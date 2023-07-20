process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const { body, validationResult } = require("express-validator");
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
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.json({
    data: messages,
    message: "ok",
  });
});

app.get("/messages/:id", (req, res) => {
  const desiredMessageId = req.params.id;
  const desiredMessage = messages.find(
    (message) => message.id === Number(desiredMessageId)
  );
  if (!desiredMessage) {
    return res.status(404).json({
      data: null,
      message: "The user with the given id was not found...",
    });
  }
  res.status(200).json({
    data: desiredMessage,
    message: "ok",
  });
});

app.post(
  "/messages",
  [
    body("from", "form can not be empty").notEmpty(),
    body("text", "text can not be empty").notEmpty(),
  ],
  (req, res) => {
    // errors is an object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "Validation error",
      });
    }
    const newMessage = req.body;
    messages.push({ id: messages.length, ...newMessage });
    res.status(201).json({
      data: messages,
      messages: "The new message was added...",
    });
  }
);

app.put(
  "/messages/:id",
  [
    body("from", "form can not be empty").notEmpty(),
    body("text", "text can not be empty").notEmpty(),
  ],
  (req, res) => {
    const messageId = req.params.id;
    const message = messages.find(
      (message) => message.id === Number(messageId)
    );
    if (!message) {
      return res.status(404).json({
        data: null,
        message: "The message with the given id was not found...",
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "Validation error",
      });
    }
    messages = messages.map((message) => {
      if (message.id === Number(messageId)) {
        return { ...message, ...req.body };
      }
      return message;
    });

    res.status(200).json({
      data: messages,
      message: "The desired message was updated.",
    });
  }
);

app.delete("/messages/:id", (req, res) => {
  const deleteMessageId = req.params.id;
  let deletedMessage = messages.find(
    (message) => message.id === Number(deleteMessageId)
  );
  if (!deletedMessage) {
    return res.status(404).json({
      data: null,
      message: "The message with the given id not found...",
    });
  }
  const index = messages.indexOf(deletedMessage);
  messages.splice(index, 1);
  res.status(200).json({
    data: messages,
    messages: "The message was deleted.",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
