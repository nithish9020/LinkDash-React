import React from 'react';
import './InfoCard.css';
import prof from '../../Pictures/prof.png';

const InfoCard = ({name,role,desc,skills}) => {
  return (
    <div className='infocard-container'>
        <div>
        <img src={prof} className='profPic'/>
        </div>
        <div className='flexCenter'>
            <h1 className='profname'>{name}</h1>
            <p className='profrole'><em>{role}</em></p>
        </div>
        <div className='profdesc'>
            <p>{desc}</p>
        </div>
        <div className='skill-container'>
            {
                skills.map( (skill) => (
                    <div className='skilldiv'>{skill}</div>
                    )
                )
            }
        </div>
    </div>
  )
}

export default InfoCard