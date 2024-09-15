process.env.PORT = process.env.PORT || 3040;
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const lists = require("./mailing-lists")


app.get("/", (request, response) => {
  response.send("Welcome to mailing API");
});


app.get("/lists", (req, res) => {
  const listsArray = Object.keys(lists);
  lists?res.status(200). json(listsArray):res.status(201).send([])


  console.log(listsArray);
});

app.get("/lists/:name", (req, res) => {
  const nameIn = req.params.name;
  const listData = lists[nameIn];

  if (listData) {
    const singleObject = {
      name: nameIn,
      members: listData,
    };
    res.status(200).json({
      status: "success",
      list: singleObject,
    });
  } else {
    res.status(404).json({
      status: "fail",
      error: "List not found",
    });
  }
});

app.delete("/lists/:name", (req, res) => {
  const nameToDelete = req.params.name;

  if (lists[nameToDelete]) {
    const deletedList = {
      name: nameToDelete,
      members: lists[nameToDelete],
    };

    delete lists[nameToDelete];

    res.status(200).json({
      status: "success",
      message: "List deleted",
      deletedList: deletedList,
    });
  } else {
    res.status(404).json({
      status: "fail",
      error: "List not found",
    });
  }
});


app.put("/lists/:name", (req, res) => {
  const newList = req.params.name;
  const newMembers = req.body.members;
    if (lists.hasOwnProperty(newList))  {
      lists[newList] = newMembers;
      res.status(200).send("List updated successfully");
    } else {
      res.status(201).send("List created successfully");
    }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
