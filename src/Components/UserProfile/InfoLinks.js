import React from 'react';
import './InfoLinks.css';
import LinkPutter from './LinkPutter';

const InfoLinks = () => {

  const store =  [{id:"Dress Collection",link:"http://www.youtube.com"},
                  {id:"Template sales",link:"http://www.youtube.com"},
                  {id:" store 3",link:"http://www.youtube.com"}]

  return (
    <div className='InfoLink-container'>
      <LinkPutter heading={"Contact Me !"}/>
      <LinkPutter heading={"View My Works"}/>
      <div className='Contact-Container'>
      <div><h1>View My Stores</h1></div>
      <div className='Contact-icon-Container'>
      {store.map((c) => (
            <a href={c.link} key={c.id} target="_blank" rel="noopener noreferrer">
               <button className='store-button'>{c.id}</button>
            </a>
          ))}
          </div>
      </div>
    </div>
  );
};

export default InfoLinks;
