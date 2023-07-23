process.env.PORT = process.env.PORT || 9090;
const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

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

app.get("/messages/showAll", function (req, res) {
  res.send(messages);
});

app.get("/messages/:id", (req, res) => {
  const getById = Number(req.params.id);
  const findByID = messages.find((message) => message.id === getById);
  if (!findByID)
    return res.status(404).send("messages with the ID given was not found");
  res.send(findByID);
});

app.post("/messages/addNew", (req, res) => {
  if (!req.body.from || req.body.from.length < 3 || req.body.text.length > 500);
  res.status(400)
    .send(
      "Name is required & should be at least 3 characters & Text should be less then 500 characters"
    );

  const newMessages = {
    id: messages.length + 1,
    from: req.body.from,
    text: req.body.text,
  };

  messages.push(newMessages);
  res.json(messages);
});



app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
