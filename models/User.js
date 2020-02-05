var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
 
  playername: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    unique: true
  },
  charactername: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  role: {
      type:String,
      required: true
  },
    items: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: "Inventory"
    }
  ],

});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
