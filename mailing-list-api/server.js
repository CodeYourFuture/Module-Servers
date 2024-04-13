import express from "express";
const app = express();
app.use(express.json());

const lists = new Map();
lists.set("staff", ["talea@techtonica.org", "michelle@techtonica.org"]);
lists.set("cohort-h1-2020", [
  "ali@techtonica.org",
  "humail@techtonica.org",
  "khadar@techtonica.org",
]);

app.get("/lists", (req, res) => {
  const listsArray = Array.from(lists.keys());
  lists
    ? res.status(200).send({ lists: listsArray })
    : res.status(200).send({});
});

app.get("/lists/:name", (req, res) => {
  const params = req.params.name;

  lists.has(params)
    ? res.status(200).send({ name: params, members: lists.get(params) })
    : res.status(404);
});

app.delete("/lists/:name", (req, res) => {
  const params = req.params.name;
  lists.delete(params)
    ? res.status(200).send(`Deleted ${params} successfully!`)
    : res.status(404);
});

app.put("/lists/:name", (req, res) => {
  const params = req.params.name;
  const body = req.body;

  if (params.toLowerCase() !== body.name.toLowerCase()) {
    res
      .status(400)
      .send(
        `Request could not be completed. Path (${params}) & JSON body ("name": ${body.name}) do not match`
      );
  }

  if (lists.has(params)) {
    lists.set(params, body.members);
    res.send(`List ${params} has been updated`);
  } else {
    lists.set(params, body.members);
    res.send(`New list ${params} has been created`);
  }
});

const listener = app.listen(3003, () => {
  console.log(`Your listening on port ${listener.address().port}`);
});
