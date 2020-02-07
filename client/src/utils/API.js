import axios from "axios";

export default {
  authenticateUser: function(userData) {
    axios.get("/api/login",userData)
    .then(response=>{
        console.log(response.data)
        
        // if(response.data){
        //     console.log('successful login')
        //     this.setState({
        //         redirectTo: '/'
        //     })
        // } else {
        //     console.log('login error')
        // }
    }).catch(error => { 
        console.log('login server error: ')
        console.log(error)
    });
  },
  signUpUser: function(username,password){
    console.log(username)
    axios.post("/api/register",{
        username: username,
        password: password
    })
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
