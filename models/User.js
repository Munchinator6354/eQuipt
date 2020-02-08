const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({

  playername: {
    type: String,
    unique: false,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: false,
    required: true
  },
  charactername: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "Player"
  },
  inventory: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: "Inventory"
    }
  ],
});

UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

UserSchema.pre("save", function(next) {
  if (!this.password) {
    console.log("models/User.js ======= NO PASSWORD PROVIDED =======");
    next();
  } else {
    console.log("models/User.js hashPassword in pre save.");
    this.password = this.hashPassword(this.password);
    next();
  }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
