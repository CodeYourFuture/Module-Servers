process.env.PORT = process.env.PORT || 500;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Add this line to use body-parser

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser middleware

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.post("/messages", function (request, response) {
  const newMessage = {
    id: messages.length, // Generate an id based on the current number of messages
    from: request.body.from,
    text: request.body.text,
  };

  messages.push(newMessage); // Push the new message to the array
  console.log("New message added:", newMessage);

  response.json(newMessage);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
