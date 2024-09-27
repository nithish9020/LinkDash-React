import React from 'react';
import './EditLinks.css';
import ImageSlider from './ImageSlider'; // Assuming the ImageSlider component exists

const EditLinks = () => {
  return (
    <div className='EditLink-container'>
      <div>
        <p className='Heading'>Edit Links</p>
      </div>

      <div style={{ width: "900px" }}>
        <ImageSlider />
      </div>
    </div>
  );
};

export default EditLinks;
