import React, { useState, useRef,useContext } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom'; // For navigation
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../Config/Firebase';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import './Signup.css';

const Signup = () => {

    const idList = useContext(UserContext)?.idList?.map(item => item.userId)|| [];
    const fetchUserId = useContext(UserContext)?.fetchUserId;

    const texthead = "[ Sign up to edit your LinkDash from your dashboard after logging in ]";
    const [email, setEmail] = useState("");
    const [userName, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userId, setUserId] = useState("");
    const [otp, setOtp] = useState(""); // For storing the OTP input by the user
    const [generatedOtp, setGeneratedOtp] = useState(""); // For storing the generated OTP
    const [otpSent, setOtpSent] = useState(false); // To show OTP input when OTP is sent
    const [errorMessage, setErrorMessage] = useState("");
    
    const form = useRef(); // UseRef to target the form for EmailJS
    const navigate = useNavigate(); // Initialize useNavigate
    
    const passwordsMatch = password === confirmPassword;

    // Random 6-digit OTP generator function
    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const sendEmail = (e) => {
        
        // Generate and set OTP
        const otpCode = generateOtp();
        setGeneratedOtp(otpCode);

        const templateParams = {
            to_email: email,  // Recipient email
            message: otpCode,  // OTP to send
          };
        
        // Send the OTP via EmailJS
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_USER_ID
        )
        .then((response) => {
            console.log('Email sent sucessfully',response.status,response.text);
            toast.success("OTP sent!", {
                position: "top-left",
            });
            setOtpSent(true); // Display OTP input
        })
        .catch((err) => {
            console.log('Error sending email :', err);
            toast.error(err.message, {
                position: "top-left",
            });
        });
    };

    const CreateDoc = async () => {
        try {

            // Reference to default profile image in storage
            const defaultProfileRef = ref(storage, "prof.png");

            // Get download URL for default profile image
            const defaultProfileUrl = await getDownloadURL(defaultProfileRef);

            const docRef = doc(db,"Description",email);
            await setDoc(docRef,{
                email: email,
                name: userName,
                userId: userId,
                Role: "",
                Description: "",
                skills : [],
                profileImage: defaultProfileUrl,
            })

            const colRef = doc(db,'Store',email);
            await setDoc(colRef,{
                stores:[]
            });

            const linkRef = doc(db,"Links",email);
            await setDoc(linkRef,{
                linkArray:[]
            });

            fetchUserId();

            toast.success("Hey Folk! Your Dashboard is Ready!", {
                position: "bottom-left",
            });
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            toast.error(err.message, {
                position: "bottom-left",
            });
            console.log(err);
        }
    };
    
    const Register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);

            CreateDoc();
            
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

    const handleOtpSubmit = () => {
        if (otp === generatedOtp) {
            Register(); // Proceed with registration if OTP is correct
        } else {
            toast.error("Invalid OTP!", {
                position: "bottom-center"
            });
        }
    };

    return (
        <div className='signup-container'>
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
                        placeholder='Enter User Id'
                        maxLength={30}
                        onChange={(e) => {
                            setUserId(e.target.value);
                            if(idList.includes(e.target.value)){
                                setErrorMessage("UserID unavailable");
                            } else {
                                setErrorMessage("");
                            }
                        }}
                        required
                    />
                    <input
                        type='text'
                        className='signup-input'
                        placeholder='Enter Your Name'
                        maxLength={40}
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                
                <div className='flexdisp'>
                    <button
                        className='signup-button'
                        onClick={() => {
                            if(errorMessage===""){
                                sendEmail(); 
                            } else {
                                setErrorMessage("Check Your Details once again!")
                            }
                        }} 
                    >
                        Send OTP
                    </button>
                </div>

                {/* OTP input shows up once OTP is sent */}
                {otpSent && (
                    <div className='flexdisp' style={{ margin: "3%" }}>
                        <input
                            type='text'
                            className='signup-input'
                            placeholder='Enter OTP'
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button
                            className='signup-button'
                            onClick={handleOtpSubmit} // Verify OTP and proceed with registration
                        >
                            Verify OTP
                        </button>
                    </div>
                )}

                <div className='flexdisp'>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default Signup;
