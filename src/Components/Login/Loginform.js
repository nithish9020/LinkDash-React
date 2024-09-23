import React, { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import {auth} from '../../Config/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';

const Loginform = ({handleLogin}) => {
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);
      const isAuthenticated = handleLogin();
      if(isAuthenticated){
         navigate('/dashboard');
      }

    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
    });
      console.log(error)
    }
  }
  
  return (
    
    <div className='Login-Container'>
      <div className='flexEven'>
        <p style={{fontSize:"2.5rem",fontWeight:'500', color:"green"}}>Hey Folks!</p>
      </div>
      <div className='flexGrid input-div'>
          <input 
            className='input-login' 
            placeholder='Email' 
            type='email'
            onChange={ e => setEmail(e.target.value) }
            required/>
          <input 
          className='input-login' 
          placeholder='Password'
          type='password'
          onChange={ e => setPassword(e.target.value) }
          required/>
          <button 
              className='login-button'
              onClick={login}
          >
              Login</button>
      </div>
    </div>
  )
}

export default Loginform