import React, { useEffect } from 'react'
import './Aboutus.css';
import { useNavigate } from 'react-router-dom';

const Aboutus = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/profile/nithish9020');
  },[]);

  
  return (
    <div className='about-container'>
        <p>Still progress</p>
    </div>
  )
}

export default Aboutus