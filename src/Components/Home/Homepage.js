import React from 'react'
import './Homepage.css'
import HomeDetails from './Homedetails/HomeDetails'
import { Login } from '@mui/icons-material'
import Loginform from '../Login/Loginform'
const Homepage = () => {
  return (
    <div className='home-container'>
      <div className='home-container-div'>
          <HomeDetails/>
      </div>
      <div className='home-container-div'>
          <Loginform/>
      </div>
    </div>
  )
}

export default Homepage