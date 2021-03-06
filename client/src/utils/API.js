import axios from "axios";

export default {

    authenticateUser: function(userData) {
        return new Promise((resolve, reject) => {
            axios.post("/api/login", userData)
                .then(response => {
                    resolve(response);
                }).catch(error => {
                    console.log("Login server error: ");
                    console.log(error);
                    reject(Error("Failed to login"));
                });
        });
    },
    createItem: function(itemData) {
        return new Promise((resolve, reject) => {
            axios.post("/api/createItem", itemData)
                .then(response => {
                    resolve(response);
                }).catch(error => {
                    console.log('createItem server error: ');
                    console.log(error);
                });
        });
    },
    createAdminItem: function(itemData) {
        return new Promise((resolve, reject) => {
            axios.post("/api/createAdminItem", itemData)
                .then(response => {
                    resolve(response);
                }).catch(error => {
                    console.log('createItem server error: ');
                    console.log(error);
                    reject(error);
                });
        });
    },
    giveToUser: function(userData) {
        return new Promise((resolve, reject) => {
            axios.put("/api/give/fromuser/" + userData.userGiving + "/touser/" + userData.userToGive, userData)
                .then(response => {
                    resolve(response);
                }).catch(error => {
                    console.log("Give server error: ");
                    console.log(error);
                    reject(Error("Failed to give user"));
                });
        });
    },
    // getUserInfo calls the /api/user route which returns the user who is currently logged in
    // for a session.
    getUserInfo: function() {
        return new Promise((resolve, reject) => {
            // No need to send the username to api/user, because the backend will send you whoever
            // is currently logged in for that session.
            axios.get("/api/user")
                .then(response => {
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                });
        });
    },
    signUpUser: function(newUser) {
        return new Promise((resolve, reject) => {
            // No need to send the username to api/user, because the backend will send you whoever
            // is currently logged in for that session.
            axios.post("/api/register", newUser)
                .then(response => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        console.log('Sign-up error');
                    }
                }).catch(error => {
                    console.log('Sign up server error: ');
                    console.log(error);
                    reject(error);
                });
        });
    },
    grabPlayerInventory: function(username) {
        return new Promise((resolve, reject) => {
            axios.get("/api/items/" + username)
                .then(response => {
                    console.log("Ball getting pased from route");
                }).catch(error => {
                    console.log("grabPlayerInventory server error: ");
                    console.log(error);
                });
        });
    },
    getAdminInventory: function() {
        return new Promise((resolve, reject) => {
            axios.get("/api/adminitems")
                .then(response => {
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    },
    changeQuantity: function(itemInfo) {
        return new Promise((resolve, reject) => {
            axios.put("/api/updateItem/", itemInfo)
                .then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
        });
    },
    deleteItem: function(itemId) {
        return new Promise((resolve, reject) => {
            console.log(itemId);
            axios.delete("/api/item/", { params: { id: itemId } })
                .then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
        });
    }
};
