const express = require("express");
const mailingLists = require("./mailing-lists");
const { body, validationResult } = require("express-validator");
const app = express();

app.use(express.json());

const lists = new Map(Object.entries(mailingLists));

app.get("/lists", (req, res) => {
  const listsArray = Array.from(lists.keys());
  res.status(200).json({
    data: listsArray,
    message: "All lists",
  });
});

app.get("/lists/:name", (req, res) => {
  const list = lists.get(req.params.name);
  if (!list) {
    return res.status(404).json({
      data: null,
      message: "The list based on inputed name was not found",
    });
  }
  res.status(200).json({
    data: {
      listName: req.params.name,
      listMembers: list,
    },
    message: "The list based on inputed name",
  });
});


app.delete("/lists/:name", (req, res) => {
  const listName = req.params.name;
  const isDeletedList = lists.delete(listName)
  if(!isDeletedList){
    return res.status(404).json({
        data: null,
        messahe: "The list based on inputed name was not found"
    })
  }
  res.status(200).json({
    data: Array.from(lists),
    message: "The list based on inputed name was deleted."
  })

});

const port = 9090;
app.listen(9090, () => {
  console.log(`My app is listening on port ${port}`);
});
