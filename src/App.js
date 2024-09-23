import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Aboutus from './Components/About/Aboutus';
import Homepage from './Components/Home/Homepage';
import Navbar from './Components/Navbar/Navbar';
import Signup from './Components/Signup/Signup';
import MainProfile from './Components/UserProfile/MainProfile';
import MainDash from './Components/DashBoard/MainDash';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
    return true;
  };

  const handleLogOut = () => {
    setIsAuthenticated(false);
  }
  const handletest= () => {

  }

  return (
    <>
    <Router>
      {!isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage handleLogin={handleLogin}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/about' element={<Aboutus />} />
        <Route path='/profile' element={<MainProfile />} />
        <Route path="/dash-test" element={<MainDash handleLogOut={handletest}/>}/>
        {isAuthenticated ? (
          <Route path="/dashboard" element={<MainDash handleLogOut={handleLogOut}/>} />
        ) : (
          <Route path
          
          ="*" element={<Navigate to="/" />} />
        )}
      </Routes>
      <ToastContainer />
    </Router>
    </>
  );
}

export default App;
