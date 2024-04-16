
const express = require("express");
const app = express();
const mail_list = require("./mailing-lists");

app.use(express.json());

console.log(mail_list);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/lists", (req, res) => {
  res.send(mail_list);
});

app.get("/lists/:name", (req, res) => {
  const name = req.params.name;
  if (mail_list[name]) {
    res.status(200).send(`${name}: ${mail_list[name]}`);
  } else {
    res.status(404).send();
  }
});

app.delete("/lists/:name", (req, res) => {
  const name = req.params.name;
  if (mail_list[name]) {
    delete mail_list[name];
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

app.put("/lists/:name", (req, res) => {
  console.log(req.body);
  const name = req.params.name;
  const newMembers = req.body.members;
  if (mail_list[name]) {
    newMembers.forEach((member) => {
      mail_list[name].push(member);
    });
    res.status(200).send();
  } else {
    mail_list[name] = [];
    newMembers.forEach((member) => {
      mail_list[name].push(member);
    });
    res.status(201).send();
  }
});

for (const list in mail_list) {
  console.log(list);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});