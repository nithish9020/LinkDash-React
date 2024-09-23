import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import './MainProfile.css'

import InfoCard from './InfoCard';
import InfoLinks from './InfoLinks';
const MainProfile = ({isDash}) => {
    const location = useLocation();
    const desc="If you need to perform different actions based on the value of the input or customize the routing path, you can adjust the handleKeyDown function accordingly. For instance, if you want to navigate to a route that includes a query parameter or based on selected value, you can modify the logic within handleKeyDown.";
    const { selectedId } = location.state || {}; 
    const [name,setName] = useState('Nithishkumar');
    const [role,setRole] = useState('student');
    const [skills,setSkills] = useState(['Communication','React','Java','Communication','React','Communication','React']);
    return (
    <div className={isDash?'mprof-container':'mprof-container-margin'}>
        <div style={{width:"40%"}}>
            <InfoCard name={name} role={role} desc={desc} skills={skills} />
        </div>
        <div style={{width:"60%"}}>
            <InfoLinks/>
        </div>
    </div>
  )
}

export default MainProfile