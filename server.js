const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();
const inventoryseed = require("../eQuipt/models/inventory");
const session = require("express-session");
const passport = require("./passport");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// secret: Pick a random string to make the hash that is
// generated secure.
// resave: Set to false, this will not resave to the session
// storage unless the session is modified.
// saveUninitialized: An uninitialized session is an 
// unmodified one. When set to false, the session won't be 
// saved unless we modify it. It also won't send the id back
// to the browser. 
app.use(session({
  secret: "uncanny-Paladins",
  resave: false,
  saveUninitialized: false
}));

// Log the session on every request.
app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next();
});

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Require all models
const db = require("./models");

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

// ================================================================================
// API ROUTER
// ================================================================================

require("./routes/apiRoutes")(app);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
