import axios from "axios";

export default {

    authenticateUser: function (userData) {
     return new Promise((resolve, reject)=>{
        axios.post("/api/login", userData)
            .then(response => {
                resolve(response);
            }).catch(error => {
                console.log("Login server error: ");
                console.log(error)
                reject(Error("Failed to login"))
            })
        })
    },
    getUserInfo: function () {
        return new Promise((resolve, reject)=>{
           axios.get("/api/login")
               .then(response => {
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
    }
};
