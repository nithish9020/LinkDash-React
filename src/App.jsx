import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState,createContext,useEffect } from 'react';
import { auth, db } from './Config/Firebase';

import { collection, getDocs } from 'firebase/firestore';
import Aboutus from './Components/About/Aboutus';
import Homepage from './Components/Home/Homepage';
import Navbar from './Components/Navbar/Navbar';
import Signup from './Components/Signup/Signup';
import MainProfile from './Components/UserProfile/MainProfile';
import MainDash from './Components/DashBoard/MainDash';
import { ToastContainer } from 'react-toastify';
// import { Box, CircularProgress } from '@mui/material';
// import { onAuthStateChanged } from 'firebase/auth';

// Create the context
export const UserContext = createContext();

function App() {

  const [loading,setLoading] = useState(true);
  // const [user,setUser] = useState(null);
  const [idList, setIdList] = useState([]); // Always initialize as an empty array

  // Fetch user IDs and set in state
  const fetchUserId = async () => {
    try {
      const IdRef = collection(db, 'Description');
      const filtered = await getDocs(IdRef);
      const ids = filtered.docs.map((doc) => ({
        userId: doc.data().userId, // Assuming userId is a field
      }));
      setIdList(ids);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  // Use useEffect to fetch data once
  useEffect(() => {
    fetchUserId();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    return true;
  };

  const handleLogOut = () => {
    setIsAuthenticated(false);
  }

  // useEffect(() => {
  //   onAuthStateChanged( auth , (currentUser) => {
  //       setUser(auth.currentUser)
  //       if(user)  setIsAuthenticated(true);
  //   } )
  // })


  // if(loading) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  //       <CircularProgress />
  //     </Box>
  //   )
  // }

  return (
    <>
    <UserContext.Provider value={idList} toggleAuthentication = {handleLogOut}>
    <Router>
      {!isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage handleLogin={handleLogin}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/about' element={<Aboutus />} />
        <Route path="/profile/:userId" element={<MainProfile />} />
        {isAuthenticated ? (
          <Route path="/dashboard/*" element={<MainDash handleLogOut={handleLogOut}/>} />
          ) : (
            <Route path
            
            ="*" element={<Navigate to="/" />} />
            )}
      </Routes>
      <ToastContainer />
    </Router>
    </UserContext.Provider>
    </>
  );
}

export default App;
