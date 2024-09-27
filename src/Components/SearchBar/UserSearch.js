import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { db } from '../../Config/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const UserSearch = ({size, isDash=false}) => {

  const [idList, setId] = useState([]);
  const [inputUser, setInputUser] = useState('');
  const navigate = useNavigate();

  const fetchId = async () => {
    try {
      const IdRef = collection(db, "Links");
      const filtered = await getDocs(IdRef);
      const ids = filtered.docs.map(doc => ({
        instagramId: doc.data().instagram,
      }));
      setId(ids);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if(!isDash)
          navigate('/profile', { state: { selectedId: inputUser } });
      else  
          navigate('/dashboard/profile', {state: {selectedId: inputUser}});
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchId();
  }, []); // Empty dependency array ensures fetchId is only called once when the component mounts

  return (
    <Autocomplete
      disablePortal
      onInputChange={(event, input) => setInputUser(input)}
      options={idList.map(item => item.instagramId)} // Extract just the instagramId strings for the options
      sx={{ width: size, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
      renderInput={(params) => <TextField {...params} label="Search User"  onKeyDown={handleKeyDown}/> }
    />
  );
};

export default UserSearch;
