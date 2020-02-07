const mongoose = require("mongoose");

// ===============================================================================
// USER ROUTING
// ===============================================================================

module.exports = function(app) {

    // API GET Requests
    //
    // Log in a user.
    //
    // ---------------------------------------------------------------------------

    // Log in a user.
    app.get("/api/login", function(req, res) {
        // Authorize a user.

        let authorize = {
            auth: req.body
        };
        res.json(authorize);
    });

    // API POST Requests
    //
    // Create a new user.
    //
    // ---------------------------------------------------------------------------

    // Create a new user.
    app.post("/api/register", function(req, res) {
        // ODM create, where the user is retrieved from req.body

        db.User.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                console.log("User.js post error: ", err);
            } else if (user) {
                res.json({
                    error: `Sorry, already a user with the username: ${username}`
                });
            }
            else {
                const newUser = {
                    playername: req.body.playername,
                    username: req.body.username,
                    password: req.body.password,
                    charactername: req.body.charactername,
                    email: req.body.email,
                    role: req.body.role,
                    inventory: []
                };
                db.User
                    .create(newUser)
                    .then(dbUser => res.json(dbUser))
                    .catch(err => res.status(422).json(err));
            }
        });
    });
};