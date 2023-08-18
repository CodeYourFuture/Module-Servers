process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const fs = require("fs");
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
// const messages = [welcomeMessage];
// app.locals.messages = [welcomeMessage];
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/messages", (req, res) => {
  fs.readFile("messages.json", async (err, data) => {
    try {
      const message = await JSON.parse(data);
      res.json(message);
    } catch (err) {
      console.log(err);
    }
  });
});
app.get("/messages/random", (req, res) => {
  fs.readFile("messages.json", async (err, data) => {
    try {
      const message = await JSON.parse(data);
      res.json([_.sample(message)]);
    } catch (err) {
      console.log(err);
    }
  });
});
app.get("/messages/latest", (req, res) => {
  fs.readFile("messages.json", async (err, data) => {
    try {
      const message = await JSON.parse(data);
      if (message.length >= 10) {
        res.json(message.slice(-10).reverse());
      } else {
        res.json(message);
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.get("/messages/:Id(\\d+)", (req, res) => {
  fs.readFile("messages.json", async (err, data) => {
    try {
      const messages = await JSON.parse(data);
      const message = messages.filter((el) => el.id == Number(req.params.Id));

      res.json(message);
    } catch (err) {
      console.log(err);
    }
  });
});
app.get("/messages/search", (req, res) => {
  fs.readFile("messages.json", async (err, data) => {
    try {
      const messages = await JSON.parse(data);
      const message = messages.filter((el) =>
        el.text.toLowerCase().includes(req.query.text.toLowerCase())
      );
      res.json(message);
    } catch (err) {
      console.log(err);
    }
  });
});

app.post("/messages", (req, res) => {
  if (req.body.from !== "" && req.body.text !== "") {
    fs.readFile("messages.json", async (err, data) => {
      try {
        const messages = await JSON.parse(data);
        const newMessage = {};
        if (req.body.id == 1.1) {
          newMessage.id = messages.length;
          newMessage.from = req.body.from;
          newMessage.text = req.body.text;
          newMessage.timeSent = new Date();
          messages.push(newMessage);
          fs.writeFile("messages.json", JSON.stringify(messages), (err) => {
            if (err) {
              console.log(err);
            }
          });
          res.json([newMessage]);
        } else {
          newMessage.id = req.body.id;
          newMessage.from = req.body.from;
          newMessage.text = req.body.text;
          newMessage.timeSent = new Date();
          const updateMessages = messages.map((el) => {
            if (el.id == Number(req.body.id)) {
              el.from = req.body.from;
              el.text = req.body.text;
              return el;
            } else {
              return el;
            }
          });
          fs.writeFile(
            "messages.json",
            JSON.stringify(updateMessages),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
          res.json([newMessage]);
        }
      } catch (err) {
        console.log(err);
      }
    });

    // res.send(messages);
  } else {
    res.json([{ statusCode: 400, error: "form field empty" }]);
  }
});

app.delete("/messages/:Id", (req, res) => {
  fs.readFile("messages.json", async (err, data) => {
    try {
      const messages = await JSON.parse(data);
      const message = messages.filter((el) => el.id !== Number(req.params.Id));

      fs.writeFile("messages.json", JSON.stringify(message), (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.send("Message deleted");
    } catch (err) {
      console.log(err);
    }
  });
  //
});
app.put("/messages/:Id", (req, res) => {
  fs.readFile("messages.json", async (err, data) => {
    try {
      const messages = await JSON.parse(data);
      const message = messages.filter((el) => el.id == Number(req.params.Id));

      fs.writeFile("messages.json", JSON.stringify(messages), (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.send(message);
    } catch (err) {
      console.log(err);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
