process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { Console } from "console";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
const messages = [welcomeMessage];

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (request, response) => {
  response.json(messages);
});
app.get("/messages/:ID", (request, response) => {
  const oneMess = request.params.ID;
  console.log(oneMess);
  const filterdMessage = messages.find((one) => {
    console.log(one.id);
    return one.id == oneMess;
  });
  response.json(filterdMessage);
});
app.post("/messages", (req, res) => {
  const bod = req.body;
  const newMessage = {
    id: messages.length,
    from: bod.from,
    text: bod.text,
  };
  messages.push(newMessage);
  console.log(bod);
  res.json(messages);
});
app.delete("/messages/:ID", (req, res) => {
  const messageId = parseInt(req.params.ID);
  const index = messages.findIndex((msg) => msg.id === messageId);
  if (index !== -1) {
    messages.splice(index, 1);
  }
  res.json(messages);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
