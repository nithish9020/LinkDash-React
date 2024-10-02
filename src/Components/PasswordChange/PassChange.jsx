import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React from 'react'
import { toast } from "react-toastify";

const PassChange = (email) => {

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then(() => {
        toast.info("Password reset link has been sent!",{position:"top-right"})
    })
    .catch((error) => {
        toast.error(error.message,{position:"bottom-center"});
    });
  
    return (
    <></>
  )
}

export default PassChange