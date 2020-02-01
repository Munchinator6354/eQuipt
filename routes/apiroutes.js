const mongoose = require("mongoose");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    // API GET Requests
    //
    // Get items by user id
    // Get all items in database
    //
    // ---------------------------------------------------------------------------

    // Get all of the items associated with a given user.
    app.get("/api/items/:username", function(req, res) {
        // ODM find, where { username: req.params.username }
    });

    // ICEBOX: Get all of the items in the entire database. Only staff users should be able
    // to view all items in the database.
    app.get("/api/items", function(req, res) {
        // Items are associated with users. Do we need to get all users, then get
        // all items from those users?
    });

    // API POST Requests
    //
    // Create new items
    //
    // ---------------------------------------------------------------------------

    // Create a new item associated with a user id. Only staff users can create 
    // new items.
    app.post("/api/item/:username", function(req, res) {
        // ODM create, where { username: req.params.username } and the item is 
        // retrieved from req.body
    });

    // API UPDATE Requests
    //
    // Trade items between users
    // Give items to another user
    // Update an item (name, description, and/or quantity)
    //
    // ---------------------------------------------------------------------------

    // Trade items between two users. 
    app.update("/api/trade/:username1/:username2", function(req, res) {
        // How to authenticate both users...?
        // The ODM call will be a bit complicated here.
        // Get username1 items from req.body
        // Get username2 items from req.body
        // ODM call to put username1 items into username2 inventory
        // ODM call to put username2 items into username1 inventory
        // ICEBOX: During those two calls, there needs to be a check for duplicate items.
        // ICEBOX: If username1 already has an item that username2 is giving them, then that
        // existing item's quantity should be updated (and vice versa)
    });

    // Give items from one user to another. The "fromuser" is the only user that
    // needs to be authenticated.
    app.update("/api/give/fromuser/:username1/touser/:username2", function(req, res) {
        // Get username1 items from req.body
        // ODM call to put username1 items into username2 inventory.
    });

    // Update an item's quantity, name, or description. Only staff users can update
    // items.
    app.update("/api/item/:username", function(req, res) {
        // ODM update, where { username: username } and the item details are retrieved
        // from req.body.
    });

    // API DELETE Requests
    //
    // Delete item(s)
    //
    // ---------------------------------------------------------------------------

    // Delete an item from a user. Only staff users can delete items.
    app.delete("/api/item/:username", function(req, res) {
        // ODM delete, where { username: username } and the item details are retrieved
        // from req.body.
    });
};