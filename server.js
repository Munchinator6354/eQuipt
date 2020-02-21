// ================================================================================
// Require dependencies
// ================================================================================

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require('./passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)

// ================================================================================
// Set port, intialize express, and connect to MongoDB
// ================================================================================

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/eQuiptDB" ;
// var MONGODB_URI = "mongodb://localhost/eQuiptDB";

const PORT = process.env.PORT || 3001;
const app = express();
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// ================================================================================
// Define middleware
// ================================================================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions
app.use(
	session({
		secret: 'uncanny-Paladin', // Pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		resave: false, // Required
		saveUninitialized: false // Required
	})
);

app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next();
});

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
