module.exports = {
  staff: ["talea@techtonica.org", "michelle@techtonica.org"],
  "cohort-h1-2020": [
    "ali@techtonica.org",
    "humail@techtonica.org",
    "khadar@techtonica.org",
  ],
};

// import express from "express";
const express = require("express");

const app = express();
port = 4000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send(mails);
});

app.get("/lists", (req, res) => {
  const list = new Map();
  const listOfName = Array.from(mails);
  res.send(listOfName);
});
