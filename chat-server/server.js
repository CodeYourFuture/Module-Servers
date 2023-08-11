process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json())

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function(request, response){
  response.send(messages);
})
app.get("/messages/:id", function(request, response){
  let id = Number(request.params.id)
  console.log(request)
  let message = messages.find(message => message.id=== id)
  response.send(message);

})
app.post("/messages", function(request, response){
  response.send("tHANK YOU");
  messages.push(request.body);
})

app.listen(process.env.PORT,() => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
