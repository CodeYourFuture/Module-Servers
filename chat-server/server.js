process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});

app.get("/messages/:id", function (request, response) {
  const inputId = request.params.id;
  if (inputId) {
    const message = messages.filter((msg) => msg.id == inputId);
    response.send(message);
  }
});

app.get("/messages", function (request, response) {
  response.send(messages);
});

app.post("/messages", function (request, response) {
  let maxVal = Math.max(...messages.map((message) => message.id));
  let newRec = {};
  console.log(request.body);
  newRec.id = maxVal + 1;
  newRec.from = request.body.from;
  newRec.text = request.body.text;
  messages.push(newRec);
  response.send("record added");
});

app.delete("/messages/:id", function (request, response) {
  let inMessageId = request.params.id;
  inMessageId = Number(inMessageId);
  let removeIndex = messages.map((message) => message.id).indexOf(inMessageId);
  removeIndex >= 0 && messages.splice(removeIndex, 1);
  response.send("deleted");
});