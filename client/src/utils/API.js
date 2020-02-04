import axios from "axios";

export default {
  authenticateUser: function(username, password) {
      console.log(username)
    axios.post("/api/login",{
        username: username,
        password: password
    })
    .then(response=>{
        console.log(response)
        if(response.data){
            console.log('successful login')
            this.setState({
                redirectTo: '/'
            })
        } else {
            console.log('login error')
        }
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
  }
};
