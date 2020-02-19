var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new Inventory Schema object
// This is similar to a Sequelize model
var AdminInventorySchema = new Schema({
  // `name` is required and of type String
  name: {
    type: String,
    required: true
  },
//'description' is required and of type String
  description: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  itemlevel: {
    type: Number,
    required: false
  },
  marketprice: {
    type: Number,
    required: true
  },
  link: {
    type: String,
    required: false
  }  
});

// This creates our model from the above schema, using mongoose's model method
var AdminInventory = mongoose.model("AdminInventory", AdminInventorySchema);

// Export the Article model
module.exports = AdminInventory;

