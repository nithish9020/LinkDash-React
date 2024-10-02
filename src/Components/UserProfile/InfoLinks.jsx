import React from 'react';
import './InfoLinks.css';
import LinkPutter from './LinkPutter';

const InfoLinks = ({linkList, collection}) => {

  return (
    <div className='InfoLink-container'>
      <LinkPutter heading={"Contact Me !"} putlist = {linkList.filter((link) => link?.category==='contact')}/>
      <LinkPutter heading={"View My Works"} putlist = {linkList.filter((link) => link?.category==='work')}/>
      <div className='Contact-Container'>
      <div><h1>View My Stores</h1></div>
      <div className='Contact-icon-Container'>
      {collection.map((c,index) => (
            <a href={c?.url} key={index} target="_blank" rel="noopener noreferrer">
               <button className='store-button'>{c?.name}</button>
            </a>
          ))}
          </div>
      </div>
    </div>
  );
};

export default InfoLinks;
