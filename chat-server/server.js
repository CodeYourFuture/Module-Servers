const express = require("express");
const cors = require('cors');
var bodyParser = require('body-parser')

const app = express();

app.use(cors())
app.use(bodyParser());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage]


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.post('/messages', function(request, response) {
  const newMessage = JSON.parse(request.body)
  if (!newMessage.text || !newMessage.from) {response.status(400).send("The message objects have an empty or missing text or from property.")}
  messages.push(newMessage)
  response.json(messages)
})

app.get('/messages', function(request, response) {
  response.json(messages)
})

app.get('/messages/search', function(request, response) {
  const text = request.query.text
  const filteredMessages = messages.filter(message => message.from.includes(text) || message.text.includes(text))
  response.json(filteredMessages)
})

app.get('/messages/latest', function(request, response) {
  response.json(messages.slice(-10))
})

app.get('/messages/:id', function(request, response) {
  const id = Number(request.params.id)
  if(!id && id != 0) {response.status(400).send("Bad request, request an integer please.")}
  let messageFound = messages.find(message => message.id === id) 
  if (!messageFound) {response.status(404).send("No message here mate.")}
  response.json(messageFound)
})

app.delete('/messages/:id', function(request, response) {
  const id = Number(request.params.id)
  if(!id && id != 0) {response.status(400).send("Bad request, request an integer please.")}
  messages = messages.filter(message => message.id === id)
  response.json(messages)
})


app.listen(process.env.PORT);

