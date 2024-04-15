//import express from "express";
const express = require("express");

const app = express();
port = 9090;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.get("/hi", (req, res) => {
  res.send("hiiiiiiii");
});
