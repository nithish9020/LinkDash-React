import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom'; // Import useParams
import { db } from '../../Config/Firebase';
import './MainProfile.css';

import InfoCard from './InfoCard';
import InfoLinks from './InfoLinks';

const MainProfile = ({ isDash }) => {

  
  const idList = useContext(UserContext)?.idList.map(idobject => idobject?.userId);
  const { userId: selectedId } = useParams(); // Get the selected ID from URL parameters

  // console.log(idList);
  // console.log(selectedId);
  // console.log(idList.indexOf(selectedId));
  
  if(idList.indexOf(selectedId) === -1) {
    return(
      <div className={isDash ? 'mprof-container' : 'mprof-container-margin'}>
        <p>No user Available</p>
      </div>
    )
  }

  const [userData, setUserData] = useState(null);
  const [linkList, setLinkList] = useState([]);
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllDescriptions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Description'));
      let userEmail = null;

      querySnapshot.forEach((doc) => {
        if (doc.data().userId === selectedId) {
          setUserData({ ...doc.data() });
          userEmail = doc.data()?.email;
        }
      });

      if (userEmail) {
        // Ensure both async calls complete before proceeding
        const [links, stores] = await Promise.all([
          fetchLinkList(userEmail),
          fetchCollection(userEmail),
        ]);

        setLinkList(links || []);
        setStore(stores || []);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching descriptions:', error);
      setLoading(false);
    }
  };

  // Function to fetch Links collection based on email
  const fetchLinkList = async (email) => {
    try {
      const linkRef = doc(db, 'Links', email);
      const docSnapshot = await getDoc(linkRef);

      if (docSnapshot.exists()) {
        return docSnapshot.data()?.linkArray || [];
      } else {
        console.log('No links collection available');
        return [];
      }
    } catch (error) {
      console.log('Error fetching links collection:', error.message);
      return [];
    }
  };

  // Function to fetch Store collection based on email
  const fetchCollection = async (email) => {
    try {
      const colRef = doc(db, 'Store', email);
      const docSnapshot = await getDoc(colRef);

      if (docSnapshot.exists()) {
        return docSnapshot.data()?.stores || [];
      } else {
        console.log('No stores available for the user');
        return [];
      }
    } catch (error) {
      console.log('Error fetching store collection:', error.message);
      return [];
    }
  };

  useEffect(() => {
    if (selectedId) {
      fetchAllDescriptions();
    }
  }, [selectedId]);

  if (loading) {
    return (
      <div className={isDash ? 'mprof-container' : 'mprof-container-margin'}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className={isDash ? 'mprof-container' : 'mprof-container-margin'}>
      <div style={{ width: "40%" }}>
        <InfoCard
          name={userData?.name}
          role={userData?.Role}
          desc={userData?.Description}
          skills={userData?.skills}
          profPicture={userData?.profileImage}
        />
      </div>
      <div style={{ width: "60%" }}>
        <InfoLinks linkList={linkList} collection={store} />
      </div>
    </div>
  );
};

export default MainProfile;
