import express from "express"
import staff from "./mailing-lists.js"

const app = express()
const port = process.env.PORT || 3000

let listNames = Object.keys(staff);

app.use(express.json())

app.listen(port, () => console.log(`Listening on port ${port}...`))

app.get("/", (req, res) => res.send("Mailing list"))
app.get("/lists", (req, res) => {
  if (listNames.length > 0) {
    res.status(200).json(listNames);
  } else {
    res.status(200).json({ message: "No lists found" });
  }
})

app.get("/lists/:listName", (req, res) => {
  const listName = req.params.listName;
  if (staff[listName]) {
    res.status(200).json({
      name: listName,
      members: staff[listName]
    })
  } else {
    res.status(404).json({
      error: "List not found"
    })
  }
})

app.delete("/lists/:listName", (req, res) => {
  const listName = req.params.listName;
  if (staff[listName]) {
    delete staff[listName];
    listNames = Object.keys(staff);
    res.status(200).json({
      message: `${listName} list deleted`
    })
  } else {
    res.status(404).json({
      error: "List not found"
    })
  }
})

app.put("/lists/:listName", (req, res) => {
  const listName = req.params.listName;
  const { name, members } = req.body;

  if (!listName || !name || !members) {
    return res.status(400).json({ error: "All fields are required" })
  }

  if (listName !== name) {
    return res.status(409).json({ error: "List name and name must match" })
  }

  if (staff[name]) {
    staff[name] = members
    res.status(200).json({
      message: `${name} list updated`,
    })
  } else {
    staff[name] = members
    listNames.push(name);
    res.status(201).json({
      message: `${name} list created`,
    })
  }
})