const mongoose = require("mongoose");

// ===============================================================================
// USER ROUTING
// ===============================================================================

module.exports = function(app) {

    // API GET Requests
    //
    // Get items by user id
    // Get all items in database
    //
    // ---------------------------------------------------------------------------

    // Log in a user.
    app.get("/api/login", function(req, res) {
        // Authorize a user.
        const respondingwith = "hello!";
        let authorize = {
            auth: req.body
        };
        res.json(authorize);
    });

    // Create a new user.
    app.post("/api/register", function(req, res) {
        // ODM create, where the user is retrieved from req.body
        let user = {
            user: req.body
        };
        res.json(user);
    });
};