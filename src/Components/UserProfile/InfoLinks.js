import React from 'react';
import './InfoLinks.css';

const InfoLinks = () => {
  const contact = [
    { id: "instagram", link: "http://www.instagram.com/nithishh.in/" },
    // { id: "linkedin", link: "https://github.com/nithish9020" }
  ];

  return (
    <div className='InfoLink-container'>
      <div>
        <h3>Contact Me Here!</h3>
        <div>
        {contact.map((c) => (
            <a href={c.link} key={c.id} target="_blank" rel="noopener noreferrer">
              <img src={`../../Pictures/${c.id}.png`} alt={c.id} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoLinks;
