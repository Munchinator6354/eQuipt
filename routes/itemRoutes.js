const mongoose = require("mongoose");
var db = require("../models");
// ===============================================================================
// ITEM ROUTING
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
        let searchQuery = {
            username: req.params.username
        }
        // res.json(searchQuery);
        db.User
        .findOne(searchQuery)
        .populate("inventory")
        .then(dbUser=> res.json(dbUser))
        .catch(err => res.status(422).json(err));
    });

    // ICEBOX: Get all of the items in the entire database. Only staff users should be able
    // to view all items in the database.
    app.get("/api/items", function(req, res) {
        // Items are associated with users. Do we need to get all users, then get
        // all items from those users?
        let items = {
            items: ["item1", "item2", "item3"]
        }
        res.json(items);
    });

    // API POST Requests
    //
    // Create new items
    //
    // ---------------------------------------------------------------------------
    app.post("/api/createItem", function(req, res) {
        // ODM create, where { username: req.params.username } and the item is 
        // retrieved from req.body
        let item = {
            name: req.body.name,
            description: req.body.description,
            itemlevel: req.body.itemlevel,
            marketprice: req.body.marketprice,
            quantity: req.body.quantity,
            link: req.body.link
        }
        // res.json(item);
        console.log("YO!")
        db.Inventory
        .create(item)
        .then(dbInventory => res.json(dbInventory))
        .catch(err => res.status(422).json(err));
        
    });
    // Create a new item associated with a user id. Only staff users can create 
    // new items.
    app.post("/api/item/:username", function(req, res) {
        // ODM create, where { username: req.params.username } and the item is 
        // retrieved from req.body
        let item = {
            username: req.params.username,
            item: req.body
        }
        // res.json(item);
        db.Inventory
        .create(item.item)
        .then(dbInventory => db.User.findByIdAndUpdate({username: item.username  },{ $push: dbInventory._id}, { new: true }))
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
        
    });

    // API UPDATE Requests
    //
    // Trade items between users
    // Give items to another user
    // Update an item (name, description, and/or quantity)
    //
    // ---------------------------------------------------------------------------

    // Trade items between two users. 
    app.put("/api/trade/:username1/:username2", function(req, res) {
        // How to authenticate both users...?
        // The ODM call will be a bit complicated here.
        // Get username1 items from req.body
        // Get username2 items from req.body
        // ODM call to put username1 items into username2 inventory
        // ODM call to put username2 items into username1 inventory
        // ICEBOX: During those two calls, there needs to be a check for duplicate items.
        // ICEBOX: If username1 already has an item that username2 is giving them, then that
        // existing item's quantity should be updated (and vice versa)
        let trade = {
            username1: req.params.username1,
            username2: req.params.username2,
            items: req.body
        }
        res.json(trade);
    });

    // Give items from one user to another. The "fromuser" is the only user that
    // needs to be authenticated.
    app.put("/api/give/fromuser/:username1/touser/:username2", function(req, res) {
        // Get username1 items from req.body
        // ODM call to put username1 items into username2 inventory.
        //Drop down menu with all of a users
        let give = {
            username1: req.params.username1,
            username2: req.params.username2,
            inventoryid: req.body.inventoryid,
            give_quantity: req.body.quantity,
        }
        var GiveItem;
        // res.json(give);
        //First find item within Inventory table by id
        db.Inventory
        .findOne({_id: give.inventoryid})
        .then(function(dbInventory){
                //create new item based on item's fields with quantity given from above
                GiveItem = {
                name: dbInventory.name,
                description: dbInventory.description,
                itemlevel: dbInventory.itemlevel,
                marketprice: dbInventory.marketprice,
                quantity: give.give_quantity,
                link: dbInventory.link
            }
            db.Inventory
            .create(GiveItem)
            .then(function(dbInventory){
                //after creating item, update user2 with Given item in their inventory.
                return db.User.findOneAndUpdate({username: username2}, {$push: {inventory:dbInventory._id}}, {new:true});
            })
            .catch(function(err){
                res.json(err);
            })
        })
        .catch(function(err){
            res.json(err);
        })

        //then find item in the inventory table
        db.Inventory
        .findOne({_id: give.inventoryid})
        .then(function(dbInventory){
            //if quantity given is the same as original quantity then delete item from table
            if (dbInventory.quantity === give.give_quantity){
               db.Inventory
               .findById({_id:give.inventoryid})
               .then(dbModel => dbModel.remove())
               .then(dbModel => res.json(dbModel))
               .catch(err => res.status(422).json(err));
            }
            else{
                //else reduce quantity by quantity given as the New Quantity
                db.Inventory
               .findById({_id:give.inventoryid})
                .then(function(dbModel){
                    let NewQuantity = dbModel.quantity - GiveItem.quantity;
                    db.Inventory
                    .findOneAndUpdate({_id:give.inventoryid}, {quantity: NewQuantity})
                    .then(dbModel => res.json(dbModel))
                    .catch(function(err){
                        res.json(err);
                    }) 
                })
                .catch(function(err){
                    res.json(err);
                }) 
            }
        })
        .catch(function(err){
            res.json(err);
        })     
    });

    // Update an item's quantity, name, or description. Only staff users can update
    // items.
    app.put("/api/item/:username", function(req, res) {
        // ODM update, where { username: username } and the item details are retrieved
        // from req.body.
        let update = {
            username: req.params.username,
        }
        db.User
        .findOne(update)
        .update({"inventory.name": req.body.name}, 
        {$set: {'inventory.$.name': req.body.name,'inventory.$.description': req.body.description,'inventory.$.itemlevel': req.body.itemlevel,'inventory.$.marketprice': req.body.marketprice,'inventory.$.quantity': req.body.quantity,'inventory.$.link': req.body.link}})
        .then(dbUser=> res.json(dbUser))
        .catch(err => res.status(422).json(err));
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
        let deletion = {
            username: req.params.username,
        }
        // res.json(deletion);
        db.User
        .findOneAndRemove({deletion, "inventory.name": req.body.name})
        .then(dbUser=> res.json(dbUser))
        .catch(err => res.status(422).json(err));
    });
};
