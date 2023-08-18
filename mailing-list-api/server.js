// server.js
const cors = require("cors");
const lodash = require("lodash");
const express = require("express");
const app = express();

//loading the mailing list JSON
const mailingList = require("./mailing-list");
// middleware
app.use(cors());

// registering handlers for some routes:

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
