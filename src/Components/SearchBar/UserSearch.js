import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const UserSearch = ({ size, isDash = false }) => {
  const [inputUser, setInputUser] = useState('');
  const navigate = useNavigate();

  // Get the idList from context
  const idList = useContext(UserContext) || []; // Ensure idList is always an array

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (!isDash)
        navigate('/profile', { state: { selectedId: inputUser } });
      else
        navigate('/dashboard/profile', { state: { selectedId: inputUser } });
    }
  };

  return (
    <Autocomplete
      disablePortal
      onInputChange={(event, input) => setInputUser(input)}
      options={idList.map((item) => item.userId)} // Use userId as the option
      sx={{ width: size, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
      renderInput={(params) => <TextField {...params} label="Search User" onKeyDown={handleKeyDown} />}
    />
  );
};

export default UserSearch;
