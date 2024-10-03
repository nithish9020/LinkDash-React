import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const UserSearch = ({ size, isDash = false }) => {
  const [inputUser, setInputUser] = useState('');
  const navigate = useNavigate();

  // Get the idList from context
  const idList = useContext(UserContext)?.idList || []; // Ensure idList is always an array

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigateToProfile();
    }
  };

  const navigateToProfile = () => {
    const selectedId = inputUser;
    if (!isDash) {
      navigate(`/profile/${selectedId}`); // Navigate to /profile/:userId
    } else {
      navigate(`/dashboard/profile/${selectedId}`); // Navigate to /dashboard/profile/:userId
    }
  };

  return (
    <Autocomplete
      autoComplete={false}
      disablePortal
      onInputChange={(event, input) => setInputUser(input)}
      onChange={(event, value) => {
        setInputUser(value);
        navigateToProfile(); // Navigate when an option is selected
      }}
      options={idList.map((item) => item.userId)} // Use userId as the option
      sx={{ width: size, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search User"
          onKeyDown={handleKeyDown}
        />
      )}
    />
  );
};

export default UserSearch;
