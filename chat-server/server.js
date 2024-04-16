process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json())

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

// GET routes

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

app.get("/messages", (request, response) => {
  response.json(messages)
});

app.get("/messages/:messageId", (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

// POST routes


// DELETE routes

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});