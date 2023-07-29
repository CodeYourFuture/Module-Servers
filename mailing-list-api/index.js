const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var bodyParser = require("body-parser");

const lists = require("./mailing-lists");

app.get("/lists", (req, res) => {
  //200 and empty array if none exist
  if (Object.keys(lists).length == 0) {
    res.status(200).send([]);
  }
  res.status(200).json(lists);
});

app.listen(3007, () => {
  console.log("server started on the port 3007");
});
