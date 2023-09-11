process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get('/messages', function(req, res){
  res.status(200).json({messages})
});

app.get('/messages/:id', function(req, res){
  const id = req.params.id;
  res.status(200).json({messages: messages.filter(m => String(m.id) === id)});
});

app.post('/messages', function(req, res){
  if(req.body.from && req.body.text){
    const newMessage = {
      id: messages.length,
      from: req.body.from,
      text: req.body.text
    }
    messages.push(newMessage);
    res.status(201).json({newMessage})
  } else {
    res.status(400).json({error: "Bad request"});
  }
});

app.delete('/messages/:id', function(req, res){
  const id = parseInt(req.params.id);
  // Find the item index in the array
  const msgIndex = messages.findIndex((message) => message.id === id);

  if (msgIndex === -1) {
    // Item not found
    res.status(404).json({ message: 'Message not found' });
  } else {
    // Remove the item from the array
    messages.splice(msgIndex, 1);
    res.status(200).json({ success: true});
  }

});

app.listen(process.env.PORT,() => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
