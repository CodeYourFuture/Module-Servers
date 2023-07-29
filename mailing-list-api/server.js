const express = require("express");

const app = express();
app.use(express.json());

const mailListObject = require("./mailing-lists");

//fetch all the existing list names
app.get("/lists", function (request, response) {
  let mailList = Object.keys(mailListObject);
  if (mailList) {
    response.status(200).send(mailList);
  } else {
    response.status(200).send([]);
  }
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
