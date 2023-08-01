

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");
app.use(express.json())

// Now register handlers for some routes:

//   /                  - Return some helpful welcome info (text)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});


//update cuotes with the auther in position 0 in quotes array("Kevin Kruse") with "Shadi"
app.put("/quotes/:author", function (req, res) {
  
 
  const author = req.params.author;
  
  const index = quotes.findIndex(quote => quote.author===req.params.author);
  if (index === -1) {
    return res.status(404).json({
      data: null,
      message: "couldn't find the author",
    });
  }
 quotes.splice(index,1,req.body); 
 res.json({
   quotes,
 });

}); 
//   /quotes            - Should return all quotes (json)
app.get("/quotes", function (req, res) {
  if(!quotes){
    return res.status(404).json({
      data: null,
      message: "couldn't found quotes"
    })
  }
 res.json({ quotes });
});
//   /quotes/random     - Should return ONE quote (json)

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)

function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

  
// app.put("/quotes/:author", function (req, res) {
//   const author = req.params.author;
//   const index = quotes.findIndex((quote) => quote.author === author);

//   if (index === -1) {
//     return res.status(404).json({
//       data: null,
//       message: "couldn't find the author",
//     });
//   }
//   quotes[index].author = "Shadi";
//   res.json({
//      data:quotes[index]
//   });
// });


//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
