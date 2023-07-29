const express = require("express");

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//GET single list
app.get("/lists/:name", function (request, response) {
  const singleListName = request.params.name;
  const nameIndex = Object.keys(mailListObject).indexOf(singleListName);
  console.log(nameIndex);
  if (nameIndex !== -1) {
    const singleListValue = Object.values(mailListObject)[nameIndex];
    const singleObject = {
      name: singleListName,
      members: singleListValue,
    };
    response.status(200).send(singleObject);
  } else {
    response.sendStatus(404);
  }
});

//DELETE single list
app.delete("/lists/:name", function (request, response) {
  const listNameToDel = request.params.name;
  if (listNameToDel) {
    delete mailListObject[listNameToDel];
    response.sendStatus(200);
  } else {
    response.sendStatus(404);
  }
});
//put or update the list

app.put("/lists/:name", function (request, response) {
  const listName = request.params.name;
  const bodyName = request.body.name;
  const bodyMembers = request.body.members;
  if (listName !== bodyName) {
    response.sendStatus(400);
  } else if (mailListObject.hasOwnProperty(listName)) {
    mailListObject[listName] = bodyMembers;
    response.sendStatus(200);
  } else {
    mailListObject[bodyName] = bodyMembers;
    response.sendStatus(201);
  }
});
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
