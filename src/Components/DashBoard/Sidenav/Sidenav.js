import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Sidenav.css';
import prof from '../../../Pictures/prof.png';
import UserSearch from '../../SearchBar/UserSearch';
import { userAuthDetails } from '../MainDash';
import PassChange from '../../PasswordChange/PassChange';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'

const Sidenav = ({ logout }) => {
  const userData = useContext(userAuthDetails); // Get user data from context
  
  if(!userData) {
    return(
      <div className='flexCol side-nav-div'>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
      </Box>
      </div>
    )
  }

  return (
    <div className='flexCol side-nav-div'>
      <div className='prof-welcome'>
        <img src={prof} alt='Profile' />
        <p>
          <span className='wel-text'>Welcome</span>
          <br />
          {/* Check if userData exists and has a name */}
          <span className='name-text'>{userData?.name ? `${userData.name}!` : 'Loading...'}</span>
        </p>
      </div>
      <div className='flexCol nav-div'>
        <ul className='Edit-nav flexCol'>
          <li>
            <Link to="/dashboard/links">Edit Links</Link>
          </li>
          <li>
            <Link to="/dashboard/description">Edit Description</Link>
          </li>
          <li>
            <Link to="/dashboard/store">Modify Stores</Link>
          </li>
        </ul>
      </div>
      <div className='flexCol search-div'>
        <UserSearch size={250} isDash={true} />
      </div>
      <div 
        style={{cursor:"pointer", color:"green"}}
        onClick={() => PassChange(userData?.email)}>
        Change Password
      </div>
      <div className='flexCol logout-div'>
        <button className='logout-btn' onClick={logout}>Logout</button>
      </div>  
    </div>
  );
};

export default Sidenav;
