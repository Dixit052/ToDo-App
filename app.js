const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todolistDB")
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');


const itemSchema = new mongoose.Schema({
    task :String
})
const Task = mongoose.model("Task", itemSchema);



app.get("/",function(req,res){
  var today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

  var currentDate = today.toLocaleDateString('en-us',options)
  Task.find({},function(err,result){
    if (err){
        console.log(err)
    }
    else{
        res.render("list",{listitem: currentDate,newitem : result})
    }
  });
  
})
app.post("/delete",function(req,res){
   var id = req.body.checkbox;
   Task.findByIdAndDelete(id, function (err){
   if(err){
    console.log(err);
   }
   })
  res.redirect("/");

})
app.post("/",function(req,res){
   const  newTask = req.body.taskadd;
   const  item  = new Task({
    task : newTask
   })
   item.save();
   res.redirect("/");
    
    
})
//app.get("/work",function(req,res){

//res.render("list",{listitem:"work", newitem:w_item })
//})

app.listen(3000,function(){
    console.log("Server is running at port 3000")
})