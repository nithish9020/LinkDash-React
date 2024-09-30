import React from 'react';
import './Homepage.css';
import HomeDetails from './Homedetails/HomeDetails';
import Loginform from '../Login/Loginform';

const Homepage = ({ handleLogin }) => {

  return (
      <div className="home-container">
        <div className="home-container-div">
          <HomeDetails />
        </div>
        <div className="home-container-div">
          <Loginform handleLogin={handleLogin} />
        </div>
      </div>
  );
};

export default Homepage;