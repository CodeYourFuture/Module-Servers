const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  sender: "Bart",
  text: "Welcome to the chat system!",
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  fs.readFile("messages.json", async (err, data) => {
    try {
      const messages = await JSON.parse(data);
      res.json(messages);
    } catch (err) {
      console.log(err);
    }
  });
});

app.post("/messages", (req, res) => {
  if (req.body.sender !== "" && req.body.text !== "") {
    fs.readFile("messages.json", async (err, data) => {
      try {
        const messages = await JSON.parse(data);
        const newMessage = {
          id: messages.length,
          sender: req.body.sender,
          text: req.body.text,
          timeSent: new Date(),
        };
        messages.push(newMessage);
        fs.writeFile("messages.json", JSON.stringify(messages), (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.json([newMessage]);
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.json([{ statusCode: 400, error: "Form field empty" }]);
  }
});

app.listen(process.env.PORT || 9090, () => {
  console.log(`Listening on port ${process.env.PORT || 9090}...`);
});
