process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};
// app.set("messages", []);
//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
// app.locals.messages = [welcomeMessage];
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.post("/messages", (req, res) => {
  if (req.body.from !== "" && req.body.text !== "") {
    const newMessage = {};
    newMessage.id = messages.length;
    newMessage.from = req.body.from;
    newMessage.text = req.body.text;
    newMessage.timeSent = new Date();
    messages.push(newMessage);
    res.send(messages);
  } else {
    res.json({ statusCode: 400, error: "form fied empty" });
  }
});

app.get("/messages", (req, res) => {
  res.json(messages);
});
app.get("messages/latest", (req, res) => {
  if (messages.length >= 10) {
    const message = messages.slice(-10);
    res.json(message);
  } else {
    res.json(messages);
  }
});
app.get("/messages/search", (req, res) => {
  const message = messages.filter((el) =>
    el.text.toLowerCase().includes(req.query.text.toLowerCase())
  );
  res.json(message);
});
app.get("/messages/:Id", (req, res) => {
  const message = messages.filter((el) => el.id == req.params.Id);
  res.json(message);
});

app.delete("messages/:Id", (req, res) => {
  const message = messages.filter((el) => el.id !== req.params.Id);
  res.send("Message deleted");
});
app.put("messages/:Id", (req, res) => {
  const message = messages.filter((el) => el.id === req.params.Id);
  res.send("Message updated");
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
