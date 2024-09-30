import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, Navigate, Route, Routes } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../Config/Firebase';
import { toast, ToastContainer } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import 'react-toastify/dist/ReactToastify.css';
import Sidenav from './Sidenav/Sidenav';
import EditDes from './EditDes/EditDes';
import EditLinks from './EditLinks/EditLinks';
import Store from './Store/Store';
import './MainDash.css';
import MainProfile from '../UserProfile/MainProfile';

export const userAuthDetails = createContext();

const MainDash = ({ handleLogOut }) => {

  const navigate = useNavigate();
  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);

  // Fetch user data from Firestore using the user's email
  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.email) {
        try {
          const docRef = doc(db, 'Description', user.email);
          const docSnapshot = await getDoc(docRef);
          
          if (docSnapshot.exists()) {
            const fetchedData = docSnapshot.data();
            console.log('Fetched Data:', fetchedData); // Check what data is returned
            setUserData(fetchedData); // Set fetched data in state
          } else {
            console.log("No document found for this user.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } 
      }
    };
  
    fetchUserData();
  }, [user]);

  // Display welcome message after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("Welcome Back Folk!", {
        position: "top-center",
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Logout function with toast notification and redirection
  const Logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out Successfully!", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate('/');
        handleLogOut();
      }, 1000);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
      console.log(err);
    }
  };

  if(!userData) {
    return (
      <div className="dash-div">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%'}}>
      <CircularProgress />
      </Box>
      </div>
    )
  }

  return (
    <userAuthDetails.Provider value={userData}>
    <div className="dash-div">
      <ToastContainer />
      <div className="side-nav">
        <Sidenav logout={Logout} />
      </div>
      <div className='edit-div'>
        {/* Provide userData context only after loading completes */}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/description" />} />
            <Route path="/links" element={<EditLinks />} />
            <Route path="/description" element={<EditDes />} />
            <Route path="/store" element={<Store />} />
            <Route path="/profile" element={<MainProfile isDash={true} />} />
          </Routes>
      </div>
    </div>
    </userAuthDetails.Provider>
  );
};

export default MainDash;
