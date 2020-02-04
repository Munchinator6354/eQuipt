const express = require("express");
const path = require("path");
var mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();
var inventoryseed = require("../eQuipt/models/inventory");
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Require all models
var db = require("./models");
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/eQuiptDB", { useNewUrlParser: true });

// When the server starts, create and save a new User document to the db
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
db.Inventory.insertMany(inventoryseed)
  .then(function(dbInventory) {
    console.log(dbInventory);
  })
  .catch(function(err) {
    console.log(err.message);
  });
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// ================================================================================
// API ROUTER
// ================================================================================

// require("./routes/apiRoutes")(app);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
