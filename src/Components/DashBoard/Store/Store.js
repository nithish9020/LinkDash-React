import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './Store.css'

const Store = () => {

  const [collections, setCollection] = useState([{name:"Dress",url:"www.youtube.com"},{name:"Dress",url:"www.youtube.com"},{name:"Dress",url:"www.youtube.com"},{name:"Dress",url:"www.youtube.com"}]);
  return (
    <div className='EditDes-container'>
        <div>
            <p className='Heading'>Add Stores</p> 
        </div>
        <div className='store-container'>
          {
            collections.map( function(collection, mainKey, array) {
                return(
                <div className='store'>
                  <p>Store {mainKey+1} </p>
                  <TextField
                    key = {mainKey}
                    id={collection.name}
                    label="Collection Label"
                    value={collection.name}
                    variant="standard"
                    sx={{ width: 300 }}
                    onChange={(e) => {
                      const nameNew = e.target.value;
                      const urlNew = collections[mainKey].url;
                      
                      let newCollection = [collections.splice(0,mainKey),{nameNew,urlNew},...collections.splice(mainKey)];

                      console.log(newCollection);

                    }}
                  />
                  <TextField
                    key = {mainKey}
                    id={collection.url}
                    label="URL"
                    value={collection.url}
                    variant="standard"
                    sx={{ width: 500 }}
                  />
                </div>
              )
            }
          )  
          }
        </div>
        <div>
          <button className='desu-but'>Update Collections</button>
        </div>
    </div>
  )
}

export default Store