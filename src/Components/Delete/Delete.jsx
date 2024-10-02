import React, { useContext } from 'react'
import { getAuth, deleteUser } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../Config/Firebase';
import { deleteObject, ref } from 'firebase/storage';
import { UserContext } from '../../App';
const Delete = (imagePath) => {

    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    const toggleisAuth = useContext(UserContext).toggleAuthentication;

    const extractFilenameFromURL = (url) => {
        
        // Split the URL by '/' to get the last part
        const parts = url.split('/');
        const lastPart = parts[parts.length - 1]; // Get the last part (filename with token)
        
        // Split by '?' to remove the token and get the filename
        const filenameWithToken = lastPart.split('?')[0];
        
        return filenameWithToken;
    }

    const deleteLinks = async() => {
        try {
            const linkRef = doc(db, 'Links', user?.email);
            await deleteDoc(linkRef);
            console.log('Links deleted');
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteStore = async() => {
        try {
            const storeRef = doc(db, 'Store', user?.email);
            await deleteDoc(storeRef);
            console.log('Store Deleted');
        } catch (err) {
            console.log(err.message);
        }
    }

    const deleteProf = async() => {
        try {
            const imagePathFirebase = extractFilenameFromURL(imagePath)
            const imageRef = ref(storage, imagePathFirebase);
            await deleteObject(imageRef);
            console.log('profile deleted');
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteDocuments = async() => {
       try {
           const docRef = doc(db, 'Description', user?.email);
           await deleteDoc(docRef);
           console.log('description deleted');
   
           await Promise.all([
               deleteLinks(),
               deleteStore(),
               deleteProf()
           ]);
       } catch (error) {
            console.log(error.message)
       }
    }

    const handleDelete = async () => {
        try {
            // Delete user and wait for deletion to succeed
            await deleteUser(user);
            await deleteDocuments(); // Wait for document deletions
            toggleisAuth();
            // Navigate and show a toast message after successful deletions
            setTimeout(() => {
                toast.dark("Your Account has Been Deleted!", { position: "bottom-center" });
                navigate('/');
            }, 500);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <button onClick={handleDelete} 
                style={{
                    padding:"10% 50%",
                    border:"none",
                    borderRadius:"4ch",
                    fontSize:"1.1rem"
                }}
        >Delete Account</button>
    )
}

export default Delete;