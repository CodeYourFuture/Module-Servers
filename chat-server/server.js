process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
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

// show messages whit get api
app.get("/messages", function (req, res) {
  res.send({messages});
});


// create a new message
app.post("/messages", function (req,res) {
  messages.push(req.body);
  res.json(messages);
})

// Read one message specified by an ID
app.get("/messages/:id", function (req, res) {
  const messageId = parseInt(req.params.id);
  const message = messages.find((m) => m.id === messageId);

  if (!message) {
    return res.status(404).send({ error: "This id doesn't exist" });
  }
  res.status(200).send({ message });
});


// Delete a message, by ID
app.delete()

app.listen(process.env.PORT,() => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
