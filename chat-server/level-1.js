const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/messages", function (req, res) {
  // Handle new message creation and add it to the "messages" array
  // You can access the sender and text of the new message from req.body
});

app.get("/messages", function (req, res) {
  res.json(messages);
});

app.listen(process.env.PORT || 9090, () => {
  console.log(`Listening on PORT ${process.env.PORT || 9090}...`);
});
