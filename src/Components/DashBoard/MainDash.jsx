import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, Navigate, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../Config/Firebase';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
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
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = useCallback(async () => {
    if (user && user.email) {
      try {
        const docRef = doc(db, 'Description', user.email);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const fetchedData = docSnapshot.data();
          setUserData(fetchedData); // Set fetched data in state
        } else {
          console.log("No document found for this user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("Welcome Back!", {
        position: "top-center",
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  if (userData===null || user===null) {
    return (
      <div className="dash-div">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <userAuthDetails.Provider value={userData}>
      <div className="dash-div">
        <div className="side-nav">
          <Sidenav logout={Logout} fetchData={fetchUserData}/>
        </div>
        <div className='edit-div'>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/description" />} />
            <Route path="/links" element={<EditLinks />} />
            <Route path="/description" element={<EditDes fetchData={fetchUserData} />} />
            <Route path="/store" element={<Store />} />
            <Route path="/profile/:userId" element={<MainProfile isDash={true} />} />
          </Routes>
        </div>
      </div>
    </userAuthDetails.Provider>
  );
};

export default MainDash;
