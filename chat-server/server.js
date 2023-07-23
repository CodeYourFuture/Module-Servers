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

const messages = [welcomeMessage];


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (request, response) => {
  response.json(messages)
})

app.post("/messages", (request, response) => {
  const newMessage = {
    id: messages.length + 1,
    from: request.body.from,
    text: request.body.text
  }
  messages.push(newMessage)
  response.send(messages)
})

app.listen(process.env.PORT,() => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
