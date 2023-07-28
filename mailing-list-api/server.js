process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const mailingListObj = require("./mailing-lists");
// const mailingList = Object.keys(mailingListObj).map((key) => [key, mailingListObj[key]]);
// console.log(mailingList);

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});

app.get("/lists", function (request, response) {
  //   lists = Object.keys(mailingListObj);
  let mailingList = Object.entries(mailingListObj).map(([key, value]) => ({ [key]: value }));
  lists = mailingList.map((list) => Object.keys(list)[0]);
  response.status(200).json(lists);
});

app.get("/lists/:name", function (request, response) {
  const listName = request.params.name;
  let listIndex = -1;
  if (listName) {
    listIndex = Object.keys(mailingListObj).indexOf(listName);
    if (listIndex > -1) {
      let newObj = {};
      newObj[listName] = mailingListObj[listName];

      response.status(200).json(newObj);
    } else {
      response.sendStatus(404);
    }
  }
});

app.put("/lists/:name", function (request, response) {
  const listName = request.params.name;
  const bodyName = request.body.name;
  const bodyMembers = request.body.members;
  let listIndex = -1;
  if (listName) {
    listIndex = Object.keys(mailingListObj).indexOf(listName);
    if (listIndex > -1) {
      mailingListObj[bodyName] = bodyMembers;
      response.sendStatus(200);
    } else {
      mailingListObj[bodyName] = bodyMembers;
      response.sendStatus(201);
    }
  }
});

app.delete("/lists/:name", function (request, response) {
  const listName = request.params.name;
  console.log(listName);
  let listIndex = -1;
  if (listName) {
    const listIndex = Object.keys(mailingListObj).indexOf(listName);
    if (listIndex > -1) {
      delete mailingListObj[listName];
      console.log(mailingListObj);
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  }
});
