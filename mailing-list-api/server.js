// server.js
const cors = require("cors");
const express = require("express");
const app = express();

//loading the mailing list JSON
const mailingList = require("./mailing-lists");
// middleware
app.use(cors());

// registering handlers for some routes:
app.get("/lists", (req, res) => {
  const listOfNames = [];
  for (let name of Object.keys(mailingList)) {
    listOfNames.push(listOfNames);
  }
  res.json(empty);
});
//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
