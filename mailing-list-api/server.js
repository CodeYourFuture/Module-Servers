//import express from "express";
const express = require("express");
const data = require("./mailing-lists");
const app = express();
port = 3000;
app.listen(port, () => {
  console.log(`listening on porttt: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.get("/list", (req, res) => {
  const list = new Map(Object.entries(data));
  const arrayOfList = Array.from(list.keys());
  console.log(arrayOfList);
  if (arrayOfList.length > 0) {
    res.status(200).send(arrayOfList);
  } else {
    res.status(200).send([]);
  }
});

app.get("/list/:name", (req, res) => {
  const endpointName = req.params.name;

  const list = new Map(Object.entries(data));
  // const listOfKeys = Array.from(list.keys());

  const emailsOfMemebers = list.get(endpointName);
  console.log(emailsOfMemebers);

  if (emailsOfMemebers) {
    const responseBody = {
      name: endpointName,
      members: emailsOfMemebers,
    };
    res.status(200).send(responseBody);
  } else {
    res.status(404).send("404 , Data not found!");
  }
});
