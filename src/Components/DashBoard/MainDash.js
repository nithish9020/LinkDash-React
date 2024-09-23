import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../Config/Firebase';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import Sidenav from './Sidenav/Sidenav';
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
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []); // Empty dependency array to run only once on mount

  const Logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out Successfully!", {
        position: "top-center",
      });
      setTimeout(navigate('/'),3000);
      handleLogOut();
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
      console.log(err);
    }
  }

  let cod = false;

  return (
    <div className='dash-div'>
      {/* <ToastContainer /> Add ToastContainer here */}
      <div className='side-nav'>
        <Sidenav logout={Logout}/>
      </div>
              {
                cod? (<div className='edit-div'>
                    
                </div>) : (<div className='prof-div'>
                  <MainProfile isDash={true}/>
                </div>
                )       
              }  
    </div>
  );
}

export default MainDash;
