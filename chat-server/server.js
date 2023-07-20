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
const messages = [
  welcomeMessage,
  {
    id: 1,
    from: "Anna",
    text: "Testing my CHAT system",
  },
  {
    id: 2,
    from: "Anna",
    text: "Training in progress",
  },
];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.send(messages)
});

app.get("/messages/search", (req, res) => {
  //Read _only_ messages whose text contains a given substring
  let result = messages.filter(msg => msg.text.toLowerCase().includes(req.query.text))
  res.send(result)
});

app.get("/messages/latest", (req, res) => {
  //Read only the most recent 10 messages: `/messages/latest`
  let result = messages.slice(-10);
  res.send(result);
});

app.post("/messages", (req, res) => {
  let result = req.body;
  if(result.from === "" || result.text === ""){
    res.sendStatus(400)
  } else {
    result.timeSent = Date();
    messages.push(result);
    // res.sendStatus(200);
    res.send(result);
  }
  
});
app.listen(process.env.PORT,() => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
