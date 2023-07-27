process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

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

app.post("/messages", function (request, response) {
  const newMessage = request.body;
  console.log(request.body);
  console.log(newMessage);
  messages.push(newMessage);
  response.send({ messages });
});

app.get("/messages/:id", function (request, response) {
  const messageId = Number(request.params.id);
  console.log(messageId);
  const messageWithMatchingId = messages.find(
    (message) => message.id === messageId
  );
  console.log(messageWithMatchingId);
  response.json({ messageWithMatchingId });
});

app.listen(process.env.PORT,() => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
