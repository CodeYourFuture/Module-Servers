process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;

const app = express();
app.use(express.json());
app.use(cors());
 const {body,validationResult} = require("express-validator");

 const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];



// show messages whit get api
app.get("/messages", function (req, res) {
  if(messages.length === 0){
    return res.status(404).json({error : "no messages found"})
  }
  res.send(messages);
});


// create a new message
app.post("/messages", [

body("text","text can't be empty").notEmpty(),
body("from","text can't be empty").notEmpty()
],function (req,res) {
const errors = validationResult(req);
if(!errors.isEmpty()){
  return res.status(400).send({
    error : errors.array()
  });
}
//add a timeSent
const newMessage={
  id:messages.length,
  from:req.body.from,
  text:req.body.text,
  timeSent:new Date().toISOString()
}
  messages.push(newMessage);
  res.status(201).json({messages});
})

// Read only messages whose text contains a given substring: /messages/search?text=express
app.get("/messages/search", function (req, res) {
  const searchText = req.query.text;
  const filteredMessages = messages.filter((message) =>
    message.text.includes(searchText)
  );
  res.json(filteredMessages);
});


// Read one message specified by an ID
app.get("/messages/:id", function (req, res) {
  const messageId = parseInt(req.params.id);
  const message = messages.find((m) => m.id === messageId);

  if (!message) {
    return res.status(404).send({ error: "This id doesn't exist" });
  }
  res.status(200).send({ message });
});


// Delete a message, by ID
app.delete("/messages/:id",function(req,res){
  const message = messages.find((m) => m.id == req.params.id);
if(!message){
  return res.status(404).json({
    error: "This id doesn't exist" 
  })
}
const index = messages.indexOf(message);
messages.splice(index,1);
res.send(
  messages

  )
})
//update a text message
app.put("/messages/:id",function (req,res) {
  const message = messages.find((m) => m.id == req.params.id);
  if (!message) {
    return res.status(404).json({
      error: "This id doesn't exist",
    });
  }
 const newMessages = messages.map(message => {
    if(message.id==req.params.id){
      return {...message,...req.body}
    }
    return message;
  })
  res.json({data:newMessages})
})

app.listen(process.env.PORT,() => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
