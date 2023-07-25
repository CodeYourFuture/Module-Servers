const express = require("express");
const mailingLists = require("./mailing-lists");
const app = express();
process.env.PORT = process.env.PORT || 9090

app.use(express.json());

const lists = new Map(Object.entries(mailingLists));

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.get("/lists", (req, res) => {
    const listsArray = Array.from(lists.keys());
    if(!listsArray){
        res.send(200).send([])
    } else {
        res.status(200).send(listsArray);
    }
})

app.get("/lists/:name", (req, res) => {
    
    const list = lists.get(req.params.name);
    if(!list){
        res.status(400).send("wrong request")
    } else {
        res.status(200).send({name: req.params.name,
        members: list})
    }
})

app.delete("/lists/:name", (req, res) => {
    const listName = req.params.name;
    const deletedName = lists.delete(listName);
    if (!deletedName) {
        res.sendStatus(404)
      } else {
        res.sendStatus(200)
      }
});

app.put("/lists/:name", (req, res) => {
    const newListName = req.params.name;
    if(newListName !== req.body.name){
        res.status(400).send("Name does not match the path!")
    } else if(lists.has(newListName)){
        res.sendStatus(200)
    } else {
        res.sendStatus(201)
    }
    lists.set(newListName, req.body.members);
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})