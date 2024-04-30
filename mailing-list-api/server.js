import express from "express"
import staff from "./mailing-lists.js"

const app = express()
const port = process.env.PORT || 3000

const listNames = Object.keys(staff);

app.use(express.json())

app.listen(port, () => console.log(`Listening on port ${port}...`))

app.get("/", (req, res) => res.send("Mailing list"))
app.get("/lists", (req, res) => {
  if (listNames.length > 0) {
    res.status(200).json(listNames);
  } else {
    res.status(200).json([]);
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
    res.status(200).json({
      message: `${listName} list deleted`
    })
  } else {
    res.status(404).json({
      error: "List not found"
    })
  }
})