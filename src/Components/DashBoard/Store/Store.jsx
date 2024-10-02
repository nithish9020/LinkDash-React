import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../../Config/Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import './Store.css';
import { toast } from 'react-toastify';
import { userAuthDetails } from '../MainDash';

const Store = () => {

  const userData = useContext(userAuthDetails);
  const [isLoading,setLoading] = useState(true);


  const [collections, setCollection] = useState([]); // Ensure collections starts as an empty array

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const docRef = doc(db, 'Store', userData?.email);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const fetchedCollection = docSnapshot.data()?.stores || []; // Default to empty array if stores doesn't exist
          setCollection(fetchedCollection);
          setLoading(false);
        } else {
          console.log('No store collection found');
        }
      } catch (error) {
        console.log('Error fetching store collection:', error.message);
      }
    };

    fetchCollection();
  }, [userData]);

  // Add a new store if the limit is not reached
  const AddStore = () => {
    if (collections.length < 4) {
      setCollection([...collections, { name: '', url: '' }]);
    } else {
      toast.error('Maximum Limit Reached', { position: 'bottom-right' });
    }
  };

  const UpdateCollection = async () => {
    try {
      const docRef = doc(db, 'Store', userData?.email);

      // Update the document with the new data
      await updateDoc(docRef, {
        stores: collections
      });

      toast.success('Stores updated successfully!', {
        position: 'bottom-right'
      });
    } catch (error) {
      toast.error('Error updating stores: ' + error.message, {
        position: 'bottom-right'
      });
      console.error('Error updating document:', error);
    }
  };

  // Generic handler to update name or URL
  const handleChange = (index, field) => (event) => {
    const newCollections = [...collections];
    newCollections[index] = {
      ...newCollections[index],
      [field]: event.target.value // Update the correct field (name or url)
    };
    setCollection(newCollections);
  };

  const handleDeleteStore = (index) => {
    // Filter out the store at the given index
    const newCollections = collections.filter((_, i) => i !== index);
    setCollection(newCollections); // Update the state
  };

  if(isLoading) {
    return (
      <div className='EditDes-container'>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
      </Box>
      </div>
    )
  }

  return (
    <div className='EditDes-container'>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '85%', flexBasis: '10%' }}>
        <p className='Heading'>Add Stores</p>
        <button className='add-but' onClick={AddStore}>
          +
        </button>
      </div>
      <div className='store-container'>
        {collections.map((collection, index) => (
          <div className='store' key={index}>
            <p>Store {index + 1}</p>
            <TextField
              label='Collection Label'
              value={collection.name}
              variant='standard'
              sx={{ width: '70%' }}
              onChange={handleChange(index, 'name')}
            />
            <TextField
              label='URL'
              value={collection.url}
              variant='standard'
              sx={{ width: '100%' }}
              onChange={handleChange(index, 'url')}
            />
            <button className='delete-store-button' onClick={() => handleDeleteStore(index)}>
              Delete Store
            </button>
          </div>
        ))}
      </div>
      <div>
        <button className='desu-but' onClick={UpdateCollection}>
          Update Collections
        </button>
      </div>
    </div>
  );
};

export default Store;
