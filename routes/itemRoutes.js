const mongoose = require("mongoose");
var db = require("../models");
// ===============================================================================
// ITEM ROUTING
// ===============================================================================

module.exports = function (app) {

    // API GET Requests
    //
    // Get items by user id
    // Get all items in database
    // Get all items from AdminInventory table
    //
    // ---------------------------------------------------------------------------

    // Get all of the items associated with a given user.
    app.get("/api/items/:username", function (req, res) {
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
    app.get("/api/adminitems", function (req, res) {
        // ODM find, where { username: req.params.username }
        db.AdminInventory
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    });

    // ICEBOX: Get all of the items in the entire database. Only staff users should be able
    // to view all items in the database.
    app.get("/api/items", function (req, res) {
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
    app.post("/api/createItem", function (req, res) {

        // Let's create an object to hold all of the given items info
        let newItem = {
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
            .then(function (dbUser) {

                let itemFound = false;
                let AlreadyHaveID;

                // Loop through receiving user's inventory, if name is found change obj to true and log that inventory id
                for (var i = 0; i < dbUser.inventory.length; i++) {
                    if (dbUser.inventory[i].name === newItem.name) {
                        itemFound = true;
                        AlreadyHaveID = dbUser.inventory[i]._id;
                    }
                }
                // If item is in receivers inventory we'll update the quantity
                if (itemFound) {
                    db.Inventory
                        .findOne({ _id: AlreadyHaveID })
                        .then(function (dbInventory) {
                            // Calculate Received quantity then update that inventoryid's quantity
                            let receivedQuantity = dbInventory.quantity + newItem.quantity;
                            return db.Inventory.findOneAndUpdate({ _id: AlreadyHaveID }, { quantity: receivedQuantity }, { new: true });
                        })
                        .then(function (dbInventory) {
                            res.json(dbInventory);
                        })
                        .catch(function (err) {
                            res.json(err);
                        });
                // If item is not already in receivers inventory create new item
                } else {
                    db.Inventory
                        .create(newItem)
                        .then(function (dbInventory) {
                            // After creating item, update the user with new item in their inventory.
                            var NewInvID = dbInventory._id;
                            db.User.findOneAndUpdate({ _id: dbUser._id }, { $push: { inventory: NewInvID } }, { new: true })
                                .then(function (updatedUser) {
                                    res.json(updatedUser);
                                })
                                .catch(function (err) {
                                    res.json(err);
                                })
                        })
                        .catch(function (err) {
                            res.json(err);
                        });
                }
            });
    });

    // For admin user to forge a new item
    app.post("/api/createAdminItem", function (req, res) {

        let item = {
            name: req.body.name,
            description: req.body.description,
            itemlevel: req.body.itemlevel,
            link: req.body.link
        };

        db.AdminInventory
            .create(item)
            .then(function (dbInventory) {
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
    app.put("/api/give/fromuser/:username1/touser/:username2", function (req, res) {

        let giveTransaction = {
            username1: req.params.username1,
            username2: req.params.username2,
            inventoryid: req.body.inventoryid,
            give_quantity: req.body.quantity,
        };
        // console.log("Give Transaction:");
        // console.log("-------------------------------------");
        // console.log(giveTransaction);
        // console.log("-------------------------------------");

        let returnedJson = {
            user1Item: {},
            user1ItemDeleted: false,
            user2Item: {}
        }

        // First find item within Inventory table by id
        db.Inventory
            .findOne({ _id: giveTransaction.inventoryid })
            .then(function (existingItem) {

                // console.log("Existing Item:");
                // console.log("-------------------------------------");
                // console.log(existingItem);
                // console.log("-------------------------------------");

                // Look up user 2 and if findone inventory name returns, then change quantity
                db.User
                    .findOne({ username: giveTransaction.username2 })
                    .populate("inventory")
                    .then(function (receivingUser) {

                        // console.log("Receiving User:");
                        // console.log("-------------------------------------");
                        // console.log(receivingUser);
                        // console.log("-------------------------------------");

                        let itemFound = false;
                        let AlreadyHaveID;

                        // Loop through receiving user's inventory. If name is found, change obj to true and log that inventory id
                        for (var i = 0; i < receivingUser.inventory.length; i++) {
                            if (receivingUser.inventory[i].name === existingItem.name) {
                                itemFound = true;
                                AlreadyHaveID = receivingUser.inventory[i]._id;

                                // console.log("Item already exists in User 2 Inventory:");
                                // console.log("-------------------------------------");
                                // console.log(AlreadyHaveID);
                                // console.log("-------------------------------------");
                            }
                        }

                        // If item is in receiver's inventory, we'll update the quantity
                        if (itemFound) {
                            db.Inventory
                                .findOne({ _id: AlreadyHaveID })
                                .then(function (ownedItem) {

                                    // console.log("User 2 Owned Item:");
                                    // console.log("-------------------------------------");
                                    // console.log(ownedItem);
                                    // console.log("-------------------------------------");

                                    // Calculate received quantity then update that inventoryid's quantity
                                    let receivedQuantity = ownedItem.quantity + giveTransaction.give_quantity;

                                    // console.log("New quantity of User 2 Item:");
                                    // console.log("-------------------------------------");
                                    // console.log(receivedQuantity);
                                    // console.log("-------------------------------------");

                                    db.Inventory.findOneAndUpdate({ _id: AlreadyHaveID }, { quantity: receivedQuantity }, { new: true })
                                        .then(function (user2UpdatedItem) {

                                            // console.log("Updated User 2 Item:");
                                            // console.log("-------------------------------------");
                                            // console.log(user2UpdatedItem);
                                            // console.log("-------------------------------------");

                                            returnedJson.user2Item = user2UpdatedItem;
                                            // If quantity given is the same as original quantity then delete item from table
                                            if (existingItem.quantity === giveTransaction.give_quantity) {
                                                db.Inventory
                                                    .findById({ _id: giveTransaction.inventoryid })
                                                    .then(itemToDelete => itemToDelete.remove())
                                                    .then(user1DeletedItem => {
                                                        returnedJson.user1Item = user1DeletedItem;
                                                        returnedJson.user1ItemDeleted = true;

                                                        // console.log("Final JSON after Deleting Item from User1 and Updating Item on User2:");
                                                        // console.log("-------------------------------------");
                                                        // console.log(returnedJson);
                                                        // console.log("-------------------------------------");

                                                        res.json(returnedJson);
                                                    })
                                                    .catch(err => res.status(422).json(err));

                                            // Else reduce quantity by quantity given as the New Quantity
                                            } else {
                                                let reducedQuantity = existingItem.quantity - giveTransaction.give_quantity;
                                                db.Inventory
                                                    .findOneAndUpdate({ _id: giveTransaction.inventoryid }, { quantity: reducedQuantity }, { new: true })
                                                    .then(user1UpdatedItem => {
                                                        returnedJson.user1Item = user1UpdatedItem;
                                                        returnedJson.user1ItemDeleted = false;

                                                        // console.log("Final JSON after Updating Item from User1 and Updating Item on User2:");
                                                        // console.log("-------------------------------------");
                                                        // console.log(returnedJson);
                                                        // console.log("-------------------------------------");

                                                        res.json(returnedJson);
                                                    })
                                                    .catch(err => res.status(422).json(err));
                                            }
                                        })
                                        .catch(function (err) {
                                            res.json(err);
                                        })
                                })
                                .catch(function (err) {
                                    res.json(err);
                                });
                        // Else if item is not already in receiver's inventory, create new item
                        } else {
                            // Create new item based on item's fields with quantity given from above
                            const newItem = {
                                name: existingItem.name,
                                description: existingItem.description,
                                itemlevel: existingItem.itemlevel,
                                quantity: giveTransaction.give_quantity,
                                link: existingItem.link
                            };

                            // console.log("New Item to Create:");
                            // console.log("-------------------------------------");
                            // console.log(newItem);
                            // console.log("-------------------------------------");

                            db.Inventory
                                .create(newItem)
                                .then(function (createdItem) {

                                    // console.log("New Created Item:");
                                    // console.log("-------------------------------------");
                                    // console.log(createdItem);
                                    // console.log("-------------------------------------");

                                    // After creating the item, update user2 with Given item in their inventory.
                                    var NewInvID = createdItem._id;
                                    db.User.findOneAndUpdate({ _id: receivingUser._id }, { $push: { inventory: NewInvID } }, { new: true })
                                        .then(function (updatedUser) {

                                            // console.log("Updated User 2:");
                                            // console.log("-------------------------------------");
                                            // console.log(updatedUser);
                                            // console.log("-------------------------------------");

                                            returnedJson.user2Item = createdItem;
                                            
                                            // If quantity given is the same as original quantity then delete item from table
                                            if (existingItem.quantity === giveTransaction.give_quantity) {
                                                db.Inventory
                                                    .findById({ _id: giveTransaction.inventoryid })
                                                    .then(itemToDelete => itemToDelete.remove())
                                                    .then(user1DeletedItem => {
                                                        returnedJson.user1Item = user1DeletedItem;
                                                        returnedJson.user1ItemDeleted = true;

                                                        // console.log("Final JSON after Deleting Item from User1 and Creating Item on User2:");
                                                        // console.log("-------------------------------------");
                                                        // console.log(returnedJson);
                                                        // console.log("-------------------------------------");

                                                        res.json(returnedJson);
                                                    })
                                                    .catch(err => res.status(422).json(err));

                                            // Else reduce quantity by quantity given as the New Quantity
                                            } else {
                                                let reducedQuantity = existingItem.quantity - giveTransaction.give_quantity;
                                                db.Inventory
                                                    .findOneAndUpdate({ _id: giveTransaction.inventoryid }, { quantity: reducedQuantity }, { new: true })
                                                    .then(user1UpdatedItem => {
                                                        returnedJson.user1Item = user1UpdatedItem;
                                                        returnedJson.user1ItemDeleted = false;

                                                        // console.log("Final JSON after Updating Item from User1 and Updating Item on User2:");
                                                        // console.log("-------------------------------------");
                                                        // console.log(returnedJson);
                                                        // console.log("-------------------------------------");

                                                        res.json(returnedJson);
                                                    })
                                                    .catch(err => res.status(422).json(err));
                                            }
                                        })
                                        .catch(function (err) {
                                            res.json(err);
                                        })
                                })
                                .catch(function (err) {
                                    res.json(err);
                                });
                        }
                    });
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Update an item's quantity, name, or description. Only staff users can update
    // items.
    app.put("/api/updateItem", function (req, res) {
        let item = {
            id: req.body.id,
            quantity: req.body.quantity,
        };

        db.Inventory
            .findByIdAndUpdate({ _id: item.id }, { quantity: item.quantity }, { new: true })
            .then(dbModel => res.json(dbModel))
            .catch(function (err) {
                res.json(err);
            });
    });

    // API DELETE Requests
    //
    // Delete item(s)
    //
    // ---------------------------------------------------------------------------

    // Delete an item from a user. Only staff users can delete items.
    app.delete("/api/item", function (req, res) {
        // ODM delete, where { username: username } and the item details are retrieved
        // from req.body.

        let item = {
            id: req.query.id
        };

        db.Inventory
            .findByIdAndDelete({ _id: item.id })
            .then(dbModel => res.json(dbModel))
            .catch(function (err) {
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
