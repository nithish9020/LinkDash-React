import React from 'react';
import { useNavigate,Navigate, Route, Routes } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../Config/Firebase';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import Sidenav from './Sidenav/Sidenav';
import EditDes from './EditDes/EditDes';
import EditLinks from './EditLinks/EditLinks';
import Store from './Store/Store';
import './MainDash.css';
import MainProfile from '../UserProfile/MainProfile';


const MainDash = ({ handleLogOut }) => {
  const navigate = useNavigate();

  // Display welcome message after a delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("Welcome Back Folk!", {
        position: "top-center",
      });
    }, 1000);
    return () => clearTimeout(timer); 
  }, []); // Empty dependency array to run only once on mount

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


  return (
    <div className="dash-div">
      
      <ToastContainer />
      
      <div className="side-nav">
          <Sidenav logout={Logout} />
      </div>

      <div className='edit-div'>
        
        <Routes>
        <Route path="/" element={<Navigate to="/dashboard/description" />} />
          <Route path="/links" element={<EditLinks />} />
          <Route path="/description" element={<EditDes />} />
          <Route path="/store" element={<Store />} />
          <Route path="/profile" element={<MainProfile isDash={true} />} />
        </Routes>
      
      </div>
    </div>
  );
};

export default MainDash;
