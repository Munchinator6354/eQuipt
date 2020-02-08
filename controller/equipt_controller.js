// const path = require("path");
// var mongoose = require("mongoose");


// // Require all models
// var db = require("../models");

// // Connect to the Mongo DB
// // mongoose.connect("mongodb://localhost/eQuiptDB", { useNewUrlParser: true });
// mongoose.connect("mongodb://GenericUser:GenericPassword123@ds029658.mlab.com:29658/heroku_4xwdbn2k", { useNewUrlParser: true });

// var odm = {
// //Registering a brand new user
//     Register: function(req,res){
//          db.User
//         .create(req.body)
//         .then(dbUser=> res.json(dbUser))
//         .catch(err => res.status(422).json(err));
//     },
// // Get all of the items associated with a given user.
//     UserItems: function(UserName){
//         db.User
//         .findOne({username: UserName})
//         .populate("inventory")
//         .then(dbUser=> res.json(dbUser))
//         .catch(err => res.status(422).json(err));
//     },
// // Create a new item associated with a user id. Only staff users can create 
//  NewItem: function(req,res){
//     db.Inventory
//     .create(req.body)
//     .then(dbInventory => db.User.findByIdAndUpdate({username: req.params.username},{ $push: { items: dbInventory._id} }, { new: true }))
//     .then(dbUser => res.json(dbUser))
//     .catch(err => res.status(422).json(err));
//  },

// // Update an item's quantity, name, or description. Only staff users can update
// // ODM update, where { username: username } and the item details are retrieved
// // from req.body.
//  Update: function(req,res){
//     db.User
//     .findOne({username: req.params.username})
//     .update({"inventory.name": req.body.name}, 
//     {$set: {'inventory.$.name': req.body.name,'inventory.$.description': req.body.description,'inventory.$.itemlevel': req.body.itemlevel,'inventory.$.marketprice': req.body.marketprice,'inventory.$.quantity': req.body.quantity,'inventory.$.link': req.body.link}})
//    .then(dbUser=> res.json(dbUser))
//    .catch(err => res.status(422).json(err));
//  },
//   // Delete an item from a user. Only staff users can delete items.
//   // ODM delete, where { username: username } and the item details are retrieved
// //         // from req.body.
// Delete: function(req,res){
//     db.User
//     .findOneAndRemove({username: req.params.username, "inventory.name": req.body.name}, req.body)
//    .then(dbUser=> res.json(dbUser))
//    .catch(err => res.status(422).json(err));
//  }
// }




// module.exports = odm;


