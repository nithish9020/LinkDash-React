import React from 'react'
import './InfoLinks.css'
import { ImageOnly } from '../../Config/Logos';

const LinkPutter = ({heading, putlist = []}) => { // Default to an empty array
  
  return (
    <div className='Contact-Container'>
        <h1>{heading}</h1>
        <div className='Contact-icon-Container'>
        {putlist.length > 0 ? (
          putlist.map((c) => (
            <a href={c?.url} target="_blank" rel="noopener noreferrer" key={c?.id}>
               <img src={ImageOnly[c?.id]} alt="social" style={{height:"50px",width:"50px"}}/>
            </a>
          ))
        ) : (
          <p>No links available</p>  // In case there are no links
        )}
        </div>
      </div>
  )
}

export default LinkPutter