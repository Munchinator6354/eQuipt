const path = require("path");
var mongoose = require("mongoose");


// Require all models
var db = require("../models");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/eQuiptDB", { useNewUrlParser: true });

var odm = {
//Registering a brand new user
    Register: function(PlayerName, UserName, PassWord, CharacterName, EMail){
         db.User
        .create({ playername: PlayerName, username: UserName, password: PassWord, charactername: CharacterName, email: EMail})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
// Get all of the items associated with a given user.
    UserItems: function(UserName){
        db.User
        .findOne({username: UserName})
        .populate("items")
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }

}




module.exports = odm;




var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      
      cb(result);
    });
  },
  // create: function(cb) {
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += vals.toString();
    queryString += ") ";
 //var queryString = "INSERT INTO burgers (burger_name) VALUES ('chicken');"
    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });

  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }

};

module.exports = orm;
