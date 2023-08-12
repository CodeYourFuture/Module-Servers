const moment = require('moment');

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
//add by mele
app.use(express.urlencoded({extended:false}));
app.use(express.json())//endadded


//Use this array as your (in-memory) data store.
let bookings = require("./bookings.json");

// TODO add your routes and helper functions here
// Create a new Booking 
app.get("/", function(request, response){
  response.sendFile(__dirname + '/index.html');
});
// Read all Bookings
app.get('/bookings',(request,response)=>{
        response.json(bookings);
        });

// Post 
app.post("/bookings", (request,response)=>{
  let formData = request.body;
  if(!formData.title || !formData.firstname || !formData.surname || !formData.email || !formData.roomid || !formData.checkindate || !formData.checkoutdate)
  { response.status(400).send({"message":"Text field is missing!"})
  }
  else{
    formData.id= (parseInt(bookings[bookings.length - 1].id) + 1);
    formData.roomid = parseInt(formData.roomid);
    formData.checkindate = (moment((formData.checkindate),'DD/MM/YYYY')).format('YYYY-MM-DD');
     formData.checkoutdate = (moment((formData.checkoutdate),'DD/MM/YYYY')).format('YYYY-MM-DD');
  bookings.push(
    formData);
  
  response.send({"message":"Form data received successfully!"});
  }
  
});




//Read one booking, specified by an ID
app.get('/bookings/:id',(request,response)=>{
       let id = parseInt(request.params.id);
      let newbookings = bookings.filter(item=>item.id===id);
       
         let bookingsRead = newbookings;
          if(bookingsRead[0]===undefined)
             {response.status(404).send({"message":`Booking can not be found by id:${id}`})}
          else{
         response.json(bookingsRead);}
        
        });

//Delete a booking, specified by an ID
app.delete("/bookings/:id",(request,response)=>{
  let id = parseInt(request.params.id);
  
 let newBookings = bookings.filter(item=>item.id != id);
   
  if(bookings.length === newBookings.length){
    response.status(404).send({"message":`Booking for deletion cannot be found by id:${id}`})
  }else{
    bookings = newBookings; 
  response.status(404).send({"message":"Data deleted successfully"})
}})





const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

