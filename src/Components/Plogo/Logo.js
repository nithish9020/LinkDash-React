import React from 'react'
import Logop from '../../logo.png'
const Logo = () => {
  return (
    <div style={{display:"flex", gap:"5px"}}>
        <img src={Logop} alt='Logo' height={50} width={45}/>
        <h2 style={{fontFamily:"monospace", fontWeight:"4rem"}}>LinkDash</h2>
    </div>
  )
}

export default Logo