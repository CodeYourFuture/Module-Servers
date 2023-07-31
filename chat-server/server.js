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

const checkId = (req, res, next) => {
  if (req.params.id * 1 > messages.length) {
    return res.status(404).json({ error: "No Message found" });
  }
  next();
};

const checkBody = (req, res, next) => {
  if (req.body.form === "" || req.body.text === "") {
    return res.status(400).json({
      error: "Please enter valid input",
    });
  }
  next();
};

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/messages", (request, response) => {
  response.status(200).json(messages);
});

app.post("/messages", checkBody, (request, response) => {
  const newMessage = {};
  newMessage.id = messages[messages.length - 1].id + 1;
  newMessage.from = request.body.from;
  newMessage.text = request.body.text;
  messages.push(newMessage);
  response.status(201).json({
    newMessage,
  });
});

app.get("/message/:id", checkId, (request, response) => {
  const mssId = request.params.id * 1;
  const message = messages.find((ms) => ms.id === mssId);

  response.status(200).json({
    message,
  });
});

app.delete("/message/:id", checkId, (request, response) => {
  const mssId = request.params.id * 1;
  const message = messages.find((ms) => ms.id === mssId);

  if (!message) {
    return response.status(404).json({
      message: "Message not found",
    });
  }

  response.status(200).json({
    message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
