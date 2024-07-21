import express from "express";
import mailingLists from "./mailing-lists.js";

const app = express();
app.use(express.json());

// /lists - fetch all existing list names 
app.get("/lists", (req,res) => {
    const listsArray = Object.keys(mailingLists);
    mailingLists
        ? res.status(200).send({mailingLists: listsArray})
        : res.status(200).send({});
})

// get single list 
app.get("/lists/:name", (req,res) => {
    const name = req.params.name;
    const list = mailingLists[name];
    mailingLists
        ? res.status(200).send({name, members: list})
        : res.status(404).send({error: "List not found"});
})

// delete single list 
app.delete("/lists/:name", (req,res) => {
    const name = req.params.name;
    mailingLists[name]
        ? (delete mailingLists[name], res.status(200).send({message: `Deleted ${name} successfully`}))
        : res.status(404).send({error: "Not found to delete"});
});

// update or create a single list
app.put("/lists/:name", (req, res) => {
    const name = req.params.name;
    const {members} = req.body;
    const status = mailingLists[name] ? 200 : 201;
    mailingLists[name] = members || [];
    res.status(status).send();
});

const PORT = 5500; 
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});