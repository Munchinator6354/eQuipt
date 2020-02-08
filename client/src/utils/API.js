import axios from "axios";

export default {
  authenticateUser: function(userData) {
    axios.post("/api/login",userData)
    .then(response=>{
        console.log("Login response: ");
        console.log(response);
        
        // if(response.data){
        //     console.log('successful login')
        //     this.setState({
        //         redirectTo: '/'
        //     })
        // } else {
        //     console.log('login error')
        // }
    }).catch(error => { 
        console.log("Login server error: ");
        console.log(error)
    });
  },
  signUpUser: function(newUser){
    console.log(newUser)
    axios.post("/api/register", newUser)
    .then(response=>{
        console.log(response)
        if(response.data){
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
  createItem: function(itemData){
      console.log(itemData)

      axios.post("/api/createItem", itemData)
      .then(response=>{
        console.log(response)
        
        // if(response.data){
        //     console.log('successful login')
        //     this.setState({
        //         redirectTo: '/'
        //     })
        // } else {
        //     console.log('login error')
        // }
    }).catch(error => { 
        console.log('createItem server error: ')
        console.log(error)
    });
  }
};
