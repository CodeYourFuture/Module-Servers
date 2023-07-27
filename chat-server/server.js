process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

// show all
app.get("/messages", function (req, res) {
  res.send(messages);
});

// find by id
app.get("/messages/:id", (req, res) => {
  const getById = Number(req.params.id);
  console.log(getById);
  const findByID = messages.find((message) => message.id === getById);
  if (!findByID)
    return res.status(404).json("messages with the ID given was not found");
  res.json(findByID);
});

// create new
app.post("/messages/cerate", (req, res) => {
  if (!req.body.from || req.body.from.length < 3 || req.body.text === "")
    return res
      .status(400)
      .json(
        "Name is required & should be at least 3 characters & should have to write message"
      );

  const newMessages = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
  };

  messages.push(newMessages);
  res.json(messages);
});

// delete by id
app.delete("/messages/delete/:id", (req, res) => {
  const getById = Number(req.params.id);
  const findByID = messages.find((message) => message.id === getById);
  const index = messages.indexOf(findByID);
  
  if (!findByID)
    return res.status(404).json("message with the ID given was not found");

  messages.splice(index, 1);
  res.json("message with the ID has been deleted");
});

//search
app.get("/messages/search", (req, res) => {
  const message = req.query.text;
  
    if (message.length < 0) {
      return res
        .status(400)
        .json("Please provide a 'text' parameter for search.");
    }

    const searchResult = messages.filter((text) =>
      text.text.toLowerCase().includes(message.toLowerCase())
    );
  res.status(200).json(searchResult);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});