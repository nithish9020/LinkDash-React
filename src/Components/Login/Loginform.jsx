import React, { useRef,useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import {auth} from '../../Config/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';
import PassChange from '../PasswordChange/PassChange';

const Loginform = ({handleLogin}) => {

  const emailRef = useRef(null);
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const login = async () => {
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const isAuthenticated = handleLogin();
      if(isAuthenticated){
          setLoading(false);
         navigate('/dashboard');
      }

    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        position: "bottom-right",
    });
      console.log(error)
    }
  }
  
  // Focus on the email input field when the component mounts
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  if(loading) {
    return (
      <h3>loading...</h3>
    )
  }
  
  return (
    
    <div className='Login-Container'>
      <div className='flexEven'>
        <p style={{fontSize:"2.5rem",fontWeight:'500', color:"green"}}>Hey Folks!</p>
      </div>
      <div className='flexGrid input-div'>
          <input 
            ref={emailRef}
            autoComplete="email"
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
      <div style={{display:"flex",justifyContent:"flex-end",padding:"3vw"}}>
        <button 
        className='reset-pass'
        onClick={() => PassChange(email)}
        >Reset Password?</button>
      </div>
    </div>
  )
}

export default Loginform