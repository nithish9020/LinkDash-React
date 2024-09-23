import React from 'react';
import './Sidenav.css';
import prof from '../../../Pictures/prof.png';
import UserSearch from '../../SearchBar/UserSearch';

const Sidenav = ({logout,name='Nithishkumar'}) => {
  return (
    <div className='flexCol side-nav-div'>
        <div className='prof-welcome'>
        <img src={prof}/>
        <p> <span className='wel-text'>Welcome</span>
            <br/> 
            <span className='name-text'>{name} !</span>
        </p>
        </div>
        <div className='flexCol nav-div'>
          <ul className='Edit-nav flexCol'>
            <li>Edit Description</li>
            <li>Edit Links</li>
            <li>Modify Store Details</li>
          </ul>
        </div>
        <div className='flexCol search-div'>
          <UserSearch size={250}/>
        </div>
        <div className='flexCol logout-div'>
        <button className='logout-btn' onClick={logout}>Logout</button>
        </div>  
    </div>
  )
}

export default Sidenav