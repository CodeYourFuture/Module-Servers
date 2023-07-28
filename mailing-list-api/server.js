process.env.PORT = process.env.PORT || 9090;
const express = require("express");

const app1 = express();

app1.use(express.json());

app1.use(express.urlencoded({ extended: true }));
const mailingListObj = require("./mailing-lists");

app1.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});

app1.get("/lists", function (request, response) {
  let mailingList = Object.entries(mailingListObj).map(([key, value]) => ({ [key]: value }));
  const lists = mailingList.map((list) => Object.keys(list)[0]);
  response.status(200).json(lists);
});

app1.get("/lists/:name", function (request, response) {
  const listName = request.params.name;

  if (listName) {
    const listIndex = Object.keys(mailingListObj).indexOf(listName);
    if (listIndex > -1) {
      let newObj = {};
      newObj[listName] = mailingListObj[listName];

      response.status(200).json(newObj);
    } else {
      response.sendStatus(404);
    }
  }
});

app1.put("/lists/:name", function (request, response) {
  const listName = request.params.name;
  const bodyName = request.body.name;
  const bodyMembers = request.body.members;
  if (listName != bodyName) {
    response.sendStatus(400);
  } else {
    if (listName) {
      const listIndex = Object.keys(mailingListObj).indexOf(listName);
      if (listIndex > -1) {
        mailingListObj[bodyName] = bodyMembers;
        response.sendStatus(200);
      } else {
        mailingListObj[bodyName] = bodyMembers;
        response.sendStatus(201);
      }
    }
  }
});

app1.delete("/lists/:name", function (request, response) {
  const listName = request.params.name;
  if (listName) {
    const listIndex = Object.keys(mailingListObj).indexOf(listName);
    if (listIndex > -1) {
      delete mailingListObj[listName];
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  }
});
