process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}


const messages = [welcomeMessage]

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.get('/messages/:id', (req, res) => {
  
  const id = Number(req.params.id);
  
  const message = messages.find(text => text.id === id);
  if (message) {
    res.json(message);
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});


app.post('/messages', (req, res) => {
  const newMessage = req.body;
  newMessage.id = messages.length + 1;
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.delete('/messages/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = messages.findIndex(msg => msg.id === id);
  if (index !== -1) {
    messages.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT,() => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
