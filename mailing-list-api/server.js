require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbFile = "mailing-lists.json";

const readDB = () => {
  try {
    const data = fs.readFileSync(dbFile);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeDB = (data) => {
  fs.writeFileSync(dbFile, JSON.stringify(data));
};

app.get("/", (req, res) => {
  const lists = readDB();
  return res.status(200).json(lists);
});

app.post("/lists", (req, res) => {
  const { name, members } = req.body;

  if (!name || !members || !Array.isArray(members)) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const newList = {
    name: name,
    members: members,
  };

  const lists = readDB();
  lists.push(newList);

  writeDB(lists);

  return res.status(201).json(newList);
});

app.get("/lists", (req, res) => {
  const lists = readDB();
  const filteredLists = lists.filter((element) => element.name);
  const listNames = filteredLists.map((element) => element.name);
  return res.status(200).json(listNames);
});

app.get("/lists/:name", (req, res) => {
  const nameParam = req.params.name;
  const lists = readDB();
  const specificList = lists.find((element) => element.name === nameParam);

  if (!specificList) {
    return res.status(404).json(`A List named "${nameParam}" was not found`);
  }

  return res.status(200).json(specificList);
});

app.get("/lists/:name/members", (req, res) => {
  const nameParam = req.params.name;
  const lists = readDB();
  const specificList = lists.find((element) => element.name === nameParam);

  if (!specificList) {
    return res.status(404).json(`A List named "${nameParam}" was not found`);
  }

  return res.status(200).json(specificList.members);
});

app.delete("/lists/:name", (req, res) => {
  const nameParam = req.params.name;
  const lists = readDB();
  const listIndex = lists.findIndex((element) => element.name === nameParam);

  if (listIndex === -1) {
    return res.status(404).json(`A List named "${nameParam}" does not exist`);
  }

  lists.splice(listIndex, 1);
  writeDB(lists);

  return res.status(200).json(`A List named "${nameParam}" was successfully deleted`);
});

app.delete("/lists/:name/members/:email", (req, res) => {
  const nameParam = req.params.name;
  const emailParam = req.params.email;
  const lists = readDB();
  const listIndex = lists.findIndex((element) => element.name === nameParam);

  if (listIndex === -1) {
    return res.status(404).json(`A List named "${nameParam}" does not exist`);
  }

  const emailIndex = lists[listIndex].members.findIndex((element) => element === emailParam);

  if (emailIndex === -1) {
    return res.status(404).json(`Email "${emailParam}" not found in List "${nameParam}"`);
  }

  lists[listIndex].members.splice(emailIndex, 1);
  writeDB(lists);

  return res.status(200).json(`The email "${emailParam}" from List "${nameParam}" was successfully deleted`);
});

app.put("/lists/:name", (req, res) => {
  const nameParam = req.params.name;
  const lists = readDB();
  const { name: newName, members: newMembers } = req.body;

  if (nameParam !== newName) {
    return res.status(404).json(`URL parameter "name": "${nameParam}" does not match PUT body "name": "${newName}"`);
  }

  const listIndex = lists.findIndex((element) => element.name === nameParam);

  if (listIndex === -1) {
    lists.push({
      name: newName,
      members: newMembers,
    });
    writeDB(lists);
    return res.status(200).json(lists);
  }

  const newMembersToAdd = newMembers.filter((element) => !lists[listIndex].members.includes(element));
  lists[listIndex].members.push(...newMembersToAdd);
  writeDB(lists);

  return res.status(201).json(lists);
});

app.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
