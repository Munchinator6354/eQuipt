var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new Inventory Schema object
// This is similar to a Sequelize model
var InventorySchema = new Schema({
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
  quantity: {
      type: Number,
      required: false
  },
  link: {
    type: String,
    required: false
  }  
});

// This creates our model from the above schema, using mongoose's model method
var Inventory = mongoose.model("Inventory", InventorySchema);

// Export the Article model
module.exports = Inventory;

