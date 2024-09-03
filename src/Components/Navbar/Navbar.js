import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Plogo/Logo'
import './Navbar.css'
import UserSearch from '../SearchBar/UserSearch';
const Navbar = () => {
  return (
    <div className='containerNavbar flexEven'>
        <div className='flexEven'>
           <Logo/> 
        </div>
        <div className='flexEven'>
          <UserSearch/>
        </div>
        <div className='navbar flexEven'>
                <ul className='navitems flexEven'>
                <li>
            <Link to="/" className='navLink'>Home</Link>
          </li>
          <li>
            <Link to="/signup" className='navLink'>Sign Up</Link>
          </li>
          <li>
            <Link to="/about" className='navLink'>About</Link>
          </li>
                </ul>
        </div>
    
    </div>
  )
}

export default Navbar