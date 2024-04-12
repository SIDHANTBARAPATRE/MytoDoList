//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Item = require('./Schema');
const date = require(__dirname + "/date.js");
main().catch(err => console.log(err));

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todolist');//connecting to server

  const item1={name : "Welcome to your todolist!"};
  const item2={name : "Hit the + button to add a new item."};
  const item3={name: "<-- Hit this to delete an item."};


  const defaultItems = [item1, item2, item3];

  // const foundItems=await Item.find({});
  // console.log(foundItems.length);

app.get("/", async function(req, res) {
  
  const day = date.getDate();
  const foundItems=await Item.find({});
  if(foundItems.length===0)
  {
    Item.insertMany(defaultItems).then(function(){ 
          console.log("data inserted")  // Success 
      }).catch(function(error){ 
          console.log(error)      // Failure 
      });
      res.redirect("/");
  }
  else
  {
    res.render("list", {listTitle: day, newListItems: foundItems});
  }

});

app.post("/", async function(req, res){

  const item = req.body.newItem;
  await Item.create({
    name: item
  });
  res.redirect("/")
});

app.post("/delete", async function(req,res){
  const _id=req.body.checkbox;
  const deletelist= await Item.findByIdAndRemove(_id).exec();
  // Item.findByIdAndRemove(_id,options.sort);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

}
