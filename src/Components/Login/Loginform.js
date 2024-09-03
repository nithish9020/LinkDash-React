import React from 'react'
import './Login.css'
import {auth} from '../../Config/Firebase';

const Loginform = () => {
  
  const [email,setEmail] =("");
  const [password,setPassword] = ("");
  
  
  
  return (
    
    <div className='Login-Container'>
      <div className='flexEven'>
        <p style={{fontSize:"2.5rem",fontWeight:'500', color:"green"}}>Hey Folks!</p>
      </div>
      <div className='flexGrid input-div'>
          <input 
            className='input-login' 
            placeholder='Instagram Handle' 
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
              onClick={ () => {
                
              }}
          >
              Login</button>
      </div>
    </div>
  )
}

export default Loginform