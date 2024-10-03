import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidenav.css';
import UserSearch from '../../SearchBar/UserSearch';
import { userAuthDetails } from '../MainDash';
import {ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from '../../../Config/Firebase';
import PassChange from '../../PasswordChange/PassChange';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Delete from '../../Delete/Delete';

const Sidenav = ({ logout, fetchData, toggleAuthentication }) => {
  const [progress, setProgress] = useState(0);
  const userData = useContext(userAuthDetails); // Get user data from context
  
  if(!userData) {
    return(
      <div className='flexCol side-nav-div'>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
      </Box>
      </div>
    )
  } 

const changeProf = async (e) => {

    e.preventDefault();
    console.log(userData?.profileImage);
    if (userData.profileImage.toString().includes('prof.png')) {
      console.log("The profile image is the default one.");
      handleFileInput();
  } else {
      console.log("The profile image is a custom one.");
      handleFileInput();
  }
}

const handleFileInput = () => {
  const input = document.createElement('input'); // Create a new input element dynamically
  input.type = 'file';                           // Set the type of the input to 'file', meaning it's a file input field
  input.accept = 'image/*';                      // Specify that the input will only accept image files (any image format)
  
  input.onchange = (e) => handleFileChange(e);   // Set an event listener for when a file is selected (onchange event)
  
  input.click();                                 // Programmatically "click" the input to open the file selection dialog
};
const handleFileChange = (e) => {
  const file = e.target.files[0];   // Get the first file selected by the user
  if (file) {                       // If a file was selected (not null or undefined)
    uploadProfileImage(file);       // Call the function to upload the image to Firebase Storage
  }
};

const uploadProfileImage = async (file) => {
  if(userData.profileImage && !userData.profileImage.includes('prof.png')) {
    // Delete existing custom profile image if not default
    const oldImageUrl = userData.profileImage; // Get the current image URL from userData
    const oldFileExtension = oldImageUrl.split('.').pop().split('?')[0]; // Extract the file extension from the URL
    const oldImageRef = ref(storage, `${userData.userId}.${oldFileExtension}`);

    deleteObject(oldImageRef).catch((error) => {
      console.error("Error deleting previous profile image:", error);
    });
  }

  const fileExtension = file.name.split('.').pop();  // Extract the file extension (e.g., 'png', 'jpg')
  const newImageRef = ref(storage, `${userData.userId}.${fileExtension}`);

  const uploadTask = uploadBytesResumable(newImageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Track upload progress
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      console.error("Error during upload:", error);
    },
    async () => {
      // Get the download URL once upload is complete
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("File available at", downloadURL);
      updateUserProfileImage(downloadURL);
    }
  );
};

const updateUserProfileImage = async (downloadURL) => {
  const userDocRef = doc(db, "Description", userData.email);
  await updateDoc(userDocRef, {
    profileImage: downloadURL,
  });
  toast.success("Profile image updated successfully!");
  fetchData();
};

  return (
    <div className='flexCol side-nav-div'>
      <div className='prof-welcome'>
      <div className='tooltip prof-welcome-hover' onClick={changeProf} style={{ position: 'relative', width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', border: '1px solid black' }}>
      <span className="tooltiptext">Click To change</span>
      <div
        style={{
          backgroundImage: `url(${userData?.profileImage})`,
          backgroundSize: 'cover', // Ensures the image covers the div
          backgroundPosition: 'center', // Centers the image
          width: '100%', // Full width of the parent div
          height: '100%', // Full height of the parent div
        }}
      />
    </div>

        <br/>
        {progress > 0  && progress<100 && <progress value={progress} max="100" />}
        <p>
          <span className='wel-text'>Welcome</span>
          <br />
          {/* Check if userData exists and has a name */}
          <span className='name-text'>{userData?.name ? `${userData.name}!` : 'Loading...'}</span>
        </p>
      </div>
      <div className='flexCol nav-div'>
        <ul className='Edit-nav flexCol'>
          <li>
            <Link to="/dashboard/links">Edit Links</Link>
          </li>
          <li>
            <Link to="/dashboard/description">Edit Description</Link>
          </li>
          <li>
            <Link to="/dashboard/store">Modify Stores</Link>
          </li>
        </ul>
      </div>
      <div className='flexCol search-div'>
        <UserSearch size={250} isDash={true} />
      </div>
      <div 
        style={{cursor:"pointer", color:"green", height:"10%"}}
        onClick={() => PassChange(userData?.email)}>
        Change Password
      </div>
      <div className='flexCol'>
        <Delete imagePath={userData?.profileImage || ''} />
      </div>
      <div className='flexCol logout-div'>
        <button className='logout-btn' onClick={logout}>Logout</button>
      </div>  
    </div>
  );
};

export default Sidenav;
