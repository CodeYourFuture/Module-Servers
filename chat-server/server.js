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
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (req, res) {
  res.send(JSON.stringify(messages));
});

app.post("/messages", (req, res) => {
  const from = req.body.from;
  const text = req.body.text;
  const id = req.body.id;
  const newMessage = {
    id: `${id === undefined || id === null ? messages.length : id}`,
    from: `${from}`,
    text: `${text}`,
  };
  messages.push(newMessage);
});

app.get("/messages/:id", (req, res) => {
  const message = messages.find(
    (message) => message.id === Number(req.params.id)
  );
  res.status(200).send({ message });
});

app.delete("/messages/:id", (req, res) => {
  const message = messages.find(
    (message) => message.id === Number(req.params.id)
  );
  const index =
    messages.indexOf(message) === 0
      ? messages.indexOf(message)
      : messages.indexOf(message) - 1;
  messages.splice(index, 1);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
