process.env.PORT = process.env.PORT || 9090;
import express, { json } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());

// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const welcomeMessage =[{
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
},
];

let lastId= 0,

//This array is our "data store".
//We will start with one message in the array.
const messages = [welcomeMessage];

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

// Get all messages
app.get("/messages", (req, res) => {
  res.send(welcomeMessage);
});

// GET a specific message by id
app.get("/messages/:id", (req, res) => {
  const message = welcomeMessage.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
