import React from 'react';
import './InfoCard.css';

const InfoCard = ({name,role,desc,skills,profPicture}) => {
  return (
    <div className='infocard-container'>
        <div>
        <div
        style={{
          backgroundImage: `url(${profPicture})`,
          borderRadius: '50%',
          backgroundSize: 'cover', // Ensures the image covers the div
          backgroundPosition: 'center', // Centers the image
          width: '150px', // Full width of the parent div
          height: '150px', // Full height of the parent div
        }}
      />
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
              skills.map( (skill, index) => (
               <div className='skilldiv' key={index}>{skill}</div>
            ))
          }
        </div>
    </div>
  )
}

export default InfoCard