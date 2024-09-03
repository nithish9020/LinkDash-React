import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {collection, addDoc} from 'firebase/firestore';
import { auth,db } from '../../Config/Firebase';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import './Signup.css';

const Signup = () => {
    const texthead = "[ Sign up to edit your LinkDash from your dashboard after logging in ]";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [igHandle, setIg] = useState("");
    const [isRegister, setRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const navigate = useNavigate(); // Initialize useNavigate

    const passwordsMatch = password === confirmPassword;

    const CreateDoc = async () => {
        try {
            const docRef = await addDoc(collection(db,"Links"), {
                instagram:igHandle,
            });
            toast.success("Hey Folk! Your Dashboard is Ready!", {
                position: "bottom-left",
            });
            console.log("Document written with "+docRef.id);
            setTimeout(() => {
                navigate('/'); 
            }, 3000);
            
        } catch(err){
            toast.error(err.message, {
                position: "bottom-left",
            });
            console.log(err)
        }
    };
    
    const Register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(user);
            CreateDoc();
            
            // Show success toast
            toast.success("Signed up successfully!", {
                position: "bottom-right"
            });
        } catch (err) {
            toast.error(err.message, {
                position: "bottom-right",
            });
            console.log(err);
        }
    };

    return (
        <div className='signup-container'>
            <ToastContainer /> {/* Toast container for displaying toasts */}
            <div className='flexdisp'>
                <h1 style={{ color: "green" }}>{texthead}</h1>
            </div>
            <div style={{ flexDirection: "column" }}>
                <div className='flexdisp' style={{ gap: "3%", margin: "3%" }}>
                    <input
                        type='text'
                        className='signup-input'
                        placeholder='Enter Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type='text'
                        className='signup-input'
                        placeholder='Enter Instagram Handle'
                        onChange={(e) => setIg(e.target.value)}
                        required
                    />
                </div>
                
                <div className='flexdisp' style={{ gap: "3%", margin: "3%" }}>
                    <input
                        type='password'
                        className='signup-input'
                        placeholder='Enter Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        id='cpass'
                        type='password'
                        className='signup-input'
                        placeholder='Confirm Password'
                        style={{
                            border: passwordsMatch || confirmPassword === ''
                                ? '4px solid green'
                                : '4px solid red'
                        }}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        required
                    />
                </div>
                
                <div className='flexdisp'>
                    <button
                        className='signup-button'
                        onClick={() => {
                            if (passwordsMatch) {
                                Register();
                                setErrorMessage("");
                            } else {
                                setErrorMessage("Passwords do not match");
                            }
                        }}
                    >
                        SignUp
                    </button>
                </div>

                <div className='flexdisp'>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default Signup;
