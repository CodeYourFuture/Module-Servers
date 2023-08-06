const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors())
//add by mele
app.use(express.urlencoded({extended:false}));
app.use(express.json())//endadded


let welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage]

//Create a new message
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});
//Read all messages
app.get('/messages',(request,response)=>{
        response.json(messages);
        });
app.post("/messages", (request,response)=>{
  let formData = request.body;
  if(!formData.from || !formData.text)
  { response.status(400).send({"message":"Text field is missing!"})
  }
  else{
    formData.id= (messages.length + 1);
  messages.push(
    formData);
  //console.log(formData);
  response.send({"message":"Form data received successfully!"});
  }
  
});

//Read one message specified by an ID
app.get('/messages/:id',(request,response)=>{
       let id = parseInt(request.params.id);
      let newmessages = messages.filter(item=>item.id===id);
         let messagesRead = newmessages;
         response.json(messagesRead);
        
        });
//Read only the most recent 10 messages: /messages/latest
app.get("/latest",(request,response)=>{
        let latestMessage = messages.slice(-10);
         response.json(latestMessage);
         
        })


//Delete a message, by ID
app.delete("/messages/:id",(request,response)=>{
  let id = parseInt(request.params.id);
  //console.log(formId);
 let newMessages = messages.filter(item=>item.id != id);
   messages = newMessages;  
  response.send({"message":"Data deleted successfully"})
})




app.listen(process.env.PORT);
