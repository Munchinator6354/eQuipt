const path = require("path");
var mongoose = require("mongoose");


// Require all models
var db = require("../models");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/eQuiptDB", { useNewUrlParser: true });

var odm = {
//Registering a brand new user
    Register: function(req,res){
         db.User
        .create(req.body)
        .then(dbUser=> res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
// Get all of the items associated with a given user.
    UserItems: function(UserName){
        db.User
        .findOne({username: UserName})
        .populate("items")
        .then(dbUser=> res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
// Create a new item associated with a user id. Only staff users can create 
 NewItem: function(req,res){
    db.Inventory.create(req.body)
    .then(dbInventory => db.User.findByIdAndUpdate({username: req.params.username},{ $push: { items: dbInventory._id} }, { new: true }))
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err));
 },

// Update an item's quantity, name, or description. Only staff users can update
// ODM update, where { username: username } and the item details are retrieved
// from req.body.
 Update: function(req,res){
    db.Inventory.findByIdAndUpdate({username: req.params.username}, req.body)
   .then(dbInventory => res.json(dbInventory))
   .catch(err => res.status(422).json(err));
 }
}




module.exports = odm;


