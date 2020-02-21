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
    // Get all items from AdminInventory table
    //
    // ---------------------------------------------------------------------------

    // Get all of the items associated with a given user.
    app.get("/api/items/:username", function(req, res) {
        // ODM find, where { username: req.params.username }
        let searchQuery = {
            username: req.params.username
        };
        console.log("REACHING items/usrname route");
        // res.json(searchQuery);
        db.User
            .findOne(searchQuery)
            .populate("inventory")
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    });

    // Get all of the items from AdminTable
    app.get("/api/adminitems", function(req, res) {
        // ODM find, where { username: req.params.username }
        db.AdminInventory
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    });

    // ICEBOX: Get all of the items in the entire database. Only staff users should be able
    // to view all items in the database.
    app.get("/api/items", function(req, res) {
        // Items are associated with users. Do we need to get all users, then get
        // all items from those users?
        let items = {
            items: ["item1", "item2", "item3"]
        };
        res.json(items);
    });

    // API POST Requests
    //
    // Create new inventory item
    // Create new admin inventory item
    //
    // ---------------------------------------------------------------------------
    app.post("/api/createItem", function(req, res) {
        // ODM create, where { username: req.params.username } and the item is 
        // retrieved from req.body
        // // res.json(item);
        // console.log("YO!");
        // console.log(user);
        // db.Inventory
        //     .create(item)
        //     .then(function(dbInventory) {
        //         console.log(dbInventory);
        //         db.User
        //             .findOneAndUpdate(user, { $push: { inventory: dbInventory._id } }, { new: true })
        //             .then(function(dbUser) {
        //                 console.log(dbUser);
        //                 res.json(dbUser);
        //             });
        //     })
        //     .catch(err => res.status(422).json(err));
        // Let's create an object to hold all of the given items info
        let item = {
            name: req.body.name,
            description: req.body.description,
            itemlevel: req.body.itemlevel,
            quantity: req.body.quantity,
            link: req.body.link
        };
        let user = {
            username: req.body.username
        };
        db.User
            .findOne(user)
            .populate("inventory")
            .then(function(dbUser) {
                let obj = null;
                let AlreadyHaveID;
                //loop through receiving user's inventory, if name is found change obj to true and log that inventory id
                for (var i = 0; i < dbUser.inventory.length; i++) {
                    if (dbUser.inventory[i].name === item.name) {
                        obj = true;
                        AlreadyHaveID = dbUser.inventory[i]._id;
                    }
                }
                //if item is in receivers inventory we'll update the quantity
                if (obj) {
                    db.Inventory
                        .findOne({ _id: AlreadyHaveID })
                        .then(function(dbInventory) {
                            //Calculate Received quantity then update that inventoryid's quantity
                            let ReceivedQuantity = dbInventory.quantity + item.quantity;
                            return db.Inventory.findOneAndUpdate({ _id: AlreadyHaveID }, { quantity: ReceivedQuantity }, { new: true });
                        })
                        .then(function(dbInventory) {
                            res.json(dbInventory);
                        })
                        .catch(function(err) {
                            res.json(err);
                        });
                }
                //if item is not already in receivers inventory create new item
                else {
                    db.Inventory
                        .create(item)
                        .then(function(dbInventory) {
                            //after creating item, update user2 with Given item in their inventory.
                            var NewInvID = dbInventory._id;
                            return db.User.findOneAndUpdate({ _id: dbUser._id }, { $push: { inventory: NewInvID } }, { new: true });
                        })
                        .then(function(dbUser) {
                            res.json(dbUser);
                        })
                        .catch(function(err) {
                            res.json(err);
                        });
                }
            });
    });

    // For admin user to forge a new item
    app.post("/api/createAdminItem", function(req, res) {

        let item = {
            name: req.body.name,
            description: req.body.description,
            itemlevel: req.body.itemlevel,
            link: req.body.link
        };

        db.AdminInventory
            .create(item)
            .then(function(dbInventory) {
                res.json(dbInventory);
            })
            .catch(err => res.status(422).json(err));
    });

    // API UPDATE Requests
    //
    // Give items to another user
    // Update an item (name, description, and/or quantity)
    //
    // ---------------------------------------------------------------------------

    // Give items from one user to another. The "fromuser" is the only user that
    // needs to be authenticated.
    app.put("/api/give/fromuser/:username1/touser/:username2", function(req, res) {
        // Get username1 items from req.body
        // ODM call to put username1 items into username2 inventory.
        // Drop down menu with all of a users
        let give = {
            username1: req.params.username1,
            username2: req.params.username2,
            inventoryid: req.body.inventoryid,
            give_quantity: req.body.quantity,
        };
        var GiveItem;
        // First find item within Inventory table by id
        db.Inventory
            .findOne({ _id: give.inventoryid })
            .then(function(dbInventory) {
                // Create new item based on item's fields with quantity given from above
                // If quantity given is the same as original quantity then delete item from table 
                if (dbInventory.quantity === give.give_quantity) {
                    db.Inventory
                        .findById({ _id: give.inventoryid })
                        .then(dbModel => dbModel.remove())
                        .then(dbModel => res.json(dbModel))
                        .catch(err => res.status(422).json(err));
                }
                else {
                    // Else reduce quantity by quantity given as the New Quantity
                    db.Inventory
                        .findById({ _id: give.inventoryid })
                        .then(function(dbModel) {
                            let NewQuantity = dbModel.quantity - GiveItem.quantity;
                            db.Inventory
                                .findOneAndUpdate({ _id: give.inventoryid }, { quantity: NewQuantity }, { new: true })
                                .then(dbModel => res.json(dbModel))
                                .catch(function(err) {
                                    res.json(err);
                                });
                        })
                        .catch(function(err) {
                            res.json(err);
                        });
                }
                // Let's create an object to hold all of the given items info
                GiveItem = {
                    name: dbInventory.name,
                    description: dbInventory.description,
                    itemlevel: dbInventory.itemlevel,
                    quantity: give.give_quantity,
                    link: dbInventory.link
                };
                //DB USER look up user 2 and if findone inventory name returns then change quantity else
                db.User
                    .findOne({ username: give.username2 })
                    .populate("inventory")
                    .then(function(dbUser) {
                        let obj = null;
                        let AlreadyHaveID;
                        //loop through receiving user's inventory, if name is found change obj to true and log that inventory id
                        console.log(dbUser.inventory);
                        for (var i = 0; i < dbUser.inventory.length; i++) {
                            if (dbUser.inventory[i].name === GiveItem.name) {
                                obj = true;
                                AlreadyHaveID = dbUser.inventory[i]._id;
                            }
                        }
                        //if item is in receivers inventory we'll update the quantity
                        if (obj) {
                            db.Inventory
                                .findOne({ _id: AlreadyHaveID })
                                .then(function(dbInventory) {
                                    //Calculate Received quantity then update that inventoryid's quantity
                                    let ReceivedQuantity = dbInventory.quantity + give.give_quantity;
                                    console.log(ReceivedQuantity);
                                    return db.Inventory.findOneAndUpdate({ _id: AlreadyHaveID }, { quantity: ReceivedQuantity }, { new: true });
                                })
                                .then(function(dbInventory) {
                                    res.json(dbInventory);
                                })
                                .catch(function(err) {
                                    res.json(err);
                                });
                        }
                        //if item is not already in receivers inventory create new item
                        else {
                            db.Inventory
                                .create(GiveItem)
                                .then(function(dbInventory) {
                                    //     //after creating item, update user2 with Given item in their inventory.
                                    var NewInvID = dbInventory._id;
                                    console.log(dbInventory);
                                    return db.User.findOneAndUpdate({ _id: dbUser._id }, { $push: { inventory: NewInvID } }, { new: true });
                                })
                                .then(function(dbUser) {
                                    res.json(dbUser);
                                })
                                .catch(function(err) {
                                    res.json(err);
                                });
                        }
                    });
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    // Update an item's quantity, name, or description. Only staff users can update
    // items.
    app.put("/api/updateItem", function(req, res) {
        // ODM update, where { username: username } and the item details are retrieved
        // from req.body.
        // let user = {
        //     username: req.body.username,
        // }
        let item = {
            id: req.body.id,
            quantity: req.body.quantity,
        };
        // let user = {
        //     username: req.body.username
        // }
        db.Inventory
            .findByIdAndUpdate({ _id: item.id }, { quantity: item.quantity }, { new: true })
            .then(dbModel => res.json(dbModel))
            .catch(function(err) {
                res.json(err);
            });

        // db.User
        // .findOne(user)
        // .update({"inventory._id": item.id}, 
        // {$set: {'inventory.$.quantity': item.quantity,'inventory.$.link': item.link}})
        // .then(dbUser=> res.json(dbUser))
        // .catch(err => res.status(422).json(err));
    });

    // API DELETE Requests
    //
    // Delete item(s)
    //
    // ---------------------------------------------------------------------------

    // Delete an item from a user. Only staff users can delete items.
    app.delete("/api/item", function(req, res) {
        // ODM delete, where { username: username } and the item details are retrieved
        // from req.body.

        let item = {
            id: req.query.id
        };

        db.Inventory
            .findByIdAndDelete({ _id: item.id })
            .then(dbModel => res.json(dbModel))
            .catch(function(err) {
                res.json(err);
            });
        // let deleteUser = {
        //     username: req.params.username,
        // }
        // let deleteItem = {
        //     username: req.params.username,
        // }
        // // res.json(deletion);
        // db.User
        // .findOneAndRemove({deletion, "inventory.name": req.body.name})
        // .then(dbUser=> res.json(dbUser))
        // .catch(err => res.status(422).json(err));
    });
};
