import FacebookLogin from 'react-facebook-login';
import {useState} from 'react'
import axios from 'axios'

const loginToFb = async () =>{
    try {
        let loginRequest = await axios.get("http://localhost:8000/auth/facebook")
        console.log(loginRequest)
        const { token } = loginRequest;
        
    } catch (err) {
        console.log(err)
        
    }
    
    
}

const FBLogin = () => {
    return (
        <FacebookLogin
            onClick={console.log('Time to login')}
        />
    )


}

export default FBLogin;