import axios from "axios";

export default {

    authenticateUser: function (userData) {
     return new Promise((resolve, reject)=>{
        axios.post("/api/login", userData)
            .then(response => {
                console.log(response)
                resolve(response);
            }).catch(error => {
                console.log("Login server error: ");
                console.log(error)
                reject(Error("Failed to login"))
            })
        })
    },
    // getUserInfo:function(userData){
    //     return new Promise((resolve, reject)=>{
    //         axios.post("/api/user", userData)
    //             .then(response=>{
    //                 console.log(response)
    //                 resolve(response)
    //             }).catch(error=>{
    //                 console.log("grab server error: " + error)
                  
    //             })
    //     })
    // },
    giveToUser: function (userData) {
        return new Promise((resolve, reject)=>{
           axios.put("/api/give/fromuser/" + userData.userGiving + "/touser/" + userData.userToGive, userData)
               .then(response => {
                   console.log(response)
                   console.log(userData.quantity)
                   console.log(userData.inventoryid)
                   console.log(userData)
                   resolve(response);
               }).catch(error => {
                   console.log("Give server error: ");
                   console.log(error)
                   reject(Error("Failed to give user"))
               })
           })
       },
    getUserInfo: function (userName) {
        return new Promise((resolve, reject)=>{
            
           axios.get("/api/user", userName.username)
               .then(response => {
                   console.log("THIS IS THE PLAYER USERNAME: " + userName.username)
                   console.log("THIS IS THE RESPONSE! " + response.data)
                resolve(response);
               }).catch(error => {
                   console.log(error)
               })
           })
       },
    signUpUser: function (newUser) {
        console.log(newUser)
        axios.post("/api/register", newUser)
            .then(response => {
                if (response.data) {
                    console.log('successful signup')
                    this.setState({
                        redirectTo: '/login'
                    })
                } else {
                    console.log('Sign-up error')
                }
            }).catch(error => {
                console.log('Sign up server error: ')
                console.log(error)
            });
    },
    createItem: function (itemData) {
        console.log(itemData)
        console.log("within axios post")

        axios.post("/api/createItem", itemData)
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log('createItem server error: ')
                console.log(error)
            });
    },
    grabPlayerInventory: function (username) {
        return new Promise ((resolve, reject) => {
            axios.get("/api/items/" + username)
            .then(response => {
                console.log("Ball getting pased from route")
            }).catch(error => {
                console.log("grabPlayerInventory server error: ")
                console.log(error);
            })
        })

    }
    

};
