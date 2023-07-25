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
// show all
app.get("/messages", function (req, res) {
  res.send(messages);
});
// find by id
app.get("/messages/:id", (req, res) => {
  const getById = Number(req.params.id);
  const findByID = messages.find((message) => message.id === getById);
  if (!findByID)
    return res.status(404).send("messages with the ID given was not found");
  res.send(findByID);
});
// create new
app.post("/messages/cerate", (req, res) => {
  if (!req.body.from || req.body.from.length < 3)
    return res
      .status(400)
      .send("Name is required & should be at least 3 characters");

  const newMessages = {
    id: messages.length + 1,
    from: req.body.from,
    text: req.body.text,
  };

  messages.push(newMessages);
  res.json(messages);
});
// delete by id
app.delete("/messages/:id", (req, res) => {
  const getById = Number(req.params.id);
  console.log("ID to be deleted:", getById);
  const findByID = messages.find((message) => message.id === getById);
  console.log("Message found:", findByID);
  const index = messages.indexOf(findByID);
  console.log("Index to be deleted:", index);
  
  if (!findByID)
    return res.status(404).send("messages with the ID given was not found");
    
  messages.splice(index, 1);
  res.status(200).send("messages with the ID has been deleted");
});


app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
