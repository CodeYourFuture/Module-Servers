const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 9090;

const app = express();

app.use(cors());
app.use(express.json()); //express.json() middleware to parse request body
app.use(express.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//level 3 - query parameters
//Q:Why does the request query function need to be written before the request parameter function?
app.get("/messages/search", (req, res) => {
  const searchFrom = req.query.from;
  const searchText = req.query.text;
  const filteredFrom = messages.filter((m) => m.from === searchFrom);
  const filteredText = messages.filter((m) => m.text === searchText);

  if (filteredFrom.length == 1) {
    const filteredMessage = filteredFrom;
    res.send(filteredMessage);
  } else if (filteredText.length == 1) {
    const filteredMessage = filteredText;
    res.send(filteredMessage);
  }
});

app.get("/messages/latest", (req, res) => {
  const latestMessages =
    messages.length > 10 ? messages.slice(messages.length - 10) : messages;
  res.send(latestMessages);
});



//level 1
app.get("/messages", (req, res) => {
  res.json(messages); //res.json({messages})
});

app.post("/messages", (req, res) => {
  const newMessage = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
  };

  if (!newMessage.from || !newMessage.text) {
    return res.status(400).json({
      status: "fail",
      message: "the message objs have an empty or missing property",
    });
  }

  messages.push(newMessage);
  res.status(201).send({ newMessage });
});

app.get("/messages/:id", (req, res) => {
  console.log("MESSAGES ID");
  const id = req.params.id;
  const message = messages.find((m) => m.id == id);
  res.send(message);
});

app.delete("/messages/:id", (req, res) => {
  const id = req.params.id;
  const messageDelete = messages.find((m) => m.id == id);

  if (!messageDelete) {
    return res.status(404).json({
      status: "fail",
      message: "No message obj with ID " + id + " is found",
    });
  }

  const index = messages.indexOf(messageDelete);
  messages.splice(index, 1);
});



//listen
app.listen(port, () => {
  console.log(`listening on PORT ${port}...`);
});
