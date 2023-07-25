process.env.PORT = process.env.PORT || 3001;
const express = require("express");
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
const app = express();
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
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/messages", function (request, response) {
  response.json({ messages });
});
app.get("/messages/:id", function (request, response) {
  let messageId = Number(request.params.id);
  const filteredMessages = messages.filter(
    (message) => message.id === messageId
  );
  response.send(filteredMessages);
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
  } else response.status(400).send("Please check the fields have been correctly filled in");
});
app.delete("/messages/:id", function (request, response) {
  const id = Number(request.params.id);
  const numberId = messages.findIndex((message) => message.id === id);
  if (!numberId) {
    response.status(400).send("Please check ID");
  } else {
    response.json(messages.splice(numberId, 1));
  }
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
