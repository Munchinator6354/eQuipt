// ================================================================================
// Require dependencies
// ================================================================================

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const inventoryseed = require("../eQuipt/models/inventory");
const db = require("./models");
const passport = require('./passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)

// ================================================================================
// Set port, intialize express, and connect to MongoDB
// ================================================================================

const PORT = process.env.PORT || 3001;
const app = express();
mongoose.connect("mongodb://localhost/eQuiptDB", { useNewUrlParser: true });

// ================================================================================
// Define middleware
// ================================================================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions
app.use(
	session({
		secret: 'uncanny-Paladin', // Pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, // Required
		saveUninitialized: false // Required
	})
);

// Passport
app.use(passport.initialize())
app.use(passport.session()) // Calls the deserializeUser

// ================================================================================
// Serve up static assets (usually on heroku)
// ================================================================================

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// ================================================================================
// Seed MongoDB
// ================================================================================

db.Inventory.insertMany(inventoryseed)
  .then(function(dbInventory) {
    console.log(dbInventory);
  })
  .catch(function(err) {
    console.log(err.message);
  });

// ================================================================================
// API ROUTER
// ================================================================================

require("./routes/userRoutes")(app);
require("./routes/itemRoutes")(app);

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// ================================================================================
// Listener
// ================================================================================

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
