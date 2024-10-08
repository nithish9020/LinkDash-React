import React, { useContext, useEffect, useState } from 'react';
import { userAuthDetails } from '../MainDash';
import './EditLinks.css';
import ImageSlider from './ImageSlider'; // Assuming the ImageSlider component exists
import { Autocomplete } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import { LogoNames } from '../../../Config/Logos';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../Config/Firebase';
import { LogoList } from '../../../Config/Logos';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditLinks = () => {
  const [isLoading, setLoading] = useState(true);
  const userData = useContext(userAuthDetails);
  const [linkList, setLinkList] = useState([]);
  const [Uselink,  setUse] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null); // For the modal
  const [isModalOpen, setModalOpen] = useState(false); // Modal state

  // Update Uselink when linkList changes
  const AddtoUseLinks = (fetchedLinkedList) => {
    const updatedFetchedList = fetchedLinkedList.map((link) => {
      const temp = {
        id: link?.id,
        src: LogoList[link.id]?.src,
        category: LogoList[link.id]?.category,
        url: link?.url
      };
      return temp;
    });
    setUse(updatedFetchedList); // Update Uselink with the new list
  };

  const openModal = (link) => {
    setSelectedLink(link);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLink(null);
  };

  const handleDelete = () => {
    if (!selectedLink) return;
  
    // Remove the link from Uselink and linkList
    const updatedUselink = Uselink.filter(link => link.id !== selectedLink.id);
    const updatedLinkList = linkList.filter(link => link.id !== selectedLink.id);
  
    // Update both Uselink and linkList states
    setUse(updatedUselink);
    setLinkList(updatedLinkList);
  
    // Close the modal after deletion
    closeModal();
  
    // Log to check the updated lists
    console.log("Updated Uselink:", updatedUselink);
    console.log("Updated LinkList:", updatedLinkList);
  };

  const handleUrlChange = (e) => {
    // Create a new object with the updated URL value
    const updatedLink = { ...selectedLink, url: e.target.value };

    // Update selectedLink state
    setSelectedLink(updatedLink);

    // Log to confirm the updated selectedLink state
    console.log("Updated selectedLink:", updatedLink);
  };

  const handleSave = () => {
    if (!selectedLink) return;
  
    console.log("handlesavecheck", selectedLink);
  
    // Log Uselink before update
    console.log("Before Save:", Uselink);
  
    // Create a new array with the updated link using map
    const updatedLinks = Uselink.map((link) =>
      link.id === selectedLink.id ? selectedLink : link
    );
  
    // Update Uselink with the new array
    setUse(updatedLinks);
  
    // Log the updated Uselink after setting the new state
    console.log("After Save (after async update):", updatedLinks);
  
    // Close the modal after saving
    closeModal();
  };
  

  const addSocial = (index) => {
    const isDuplicate = linkList.some(link => link.id === LogoList[index].id);

    if (isDuplicate) {
      toast.error("Already Added!", { position: "bottom-right" });
      return;
    }

    const newLink = { id: LogoList[index].id, category: LogoList[index].category, url: '' };

    setLinkList((prevList) => {
      const updatedList = [...prevList, newLink];
      AddtoUseLinks(updatedList);
      return updatedList;
    });
  };

  useEffect(() => {
    if (!userData) return;

    const fetchLinkList = async () => {
      try {
        const linkRef = doc(db, 'Links', userData?.email);
        const docSnapshot = await getDoc(linkRef);

        if (docSnapshot.exists()) {
          const fetchedLinkedList = docSnapshot.data()?.linkArray || [];
          setLinkList(fetchedLinkedList);
          AddtoUseLinks(fetchedLinkedList);
          setLoading(false);
        } else {
          console.log('No links collection available');
        }
      } catch (error) {
        console.log('Error fetching store collection', error.message);
      }
    };

    fetchLinkList();
  }, [userData]);

  const updateLinkList = async () => {
    try {
    
      const tempLinkList = Uselink.map(link => ({id:link?.id,category:link?.category,url:link?.url})).filter(link => link?.url!=='');

      setLinkList(tempLinkList);
      console.log(tempLinkList);
      console.log(linkList);
      
      const linkRef = doc(db, 'Links', userData?.email);

      await updateDoc(linkRef, {
        linkArray: tempLinkList
      });

      toast.success('Links updated successfully!', {
        position: 'bottom-right'
      });
    } catch (error) {
      toast.error('Error updating links: ' + error.message, {
        position: 'bottom-right'
      });
    }
  };

  if (isLoading) {
    return (
      <div className='temp'>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className={`temp ${isModalOpen ? 'blur' : ''}`}> {/* Add blur class when modal is open */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p className='Heading'>Edit Links</p>
      </div>
      <div className='add-container'>
        <div>
          <Autocomplete
            disablePortal
            options={LogoNames}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                let str = event.target.value;
                const index = LogoNames.indexOf(str.charAt(0).toUpperCase() + str.slice(1));
                if (index !== -1)
                  addSocial(index);
                else {
                  toast.dark("Select a valid social media");
                }
              }
            }}
            sx={{ width: 300, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            renderInput={(params) => <TextField {...params} label="Search Socials" />}
          />
        </div>
        <div style={{ width: "500px" }}>
          <p style={{ textAlign: "center" }}>Click to add</p>
          <ImageSlider AddSocial={addSocial} />
        </div>
      </div>
      <div className='link-table'>
        <div>
          <p className='Heading' style={{ textAlign: 'center' }}>Your Contact Links</p>
          <div className='icon-edit-container'>
            {Uselink.filter(link => link.category === 'contact').map((link) => (
              <img key={link.id} src={link?.src} alt={link?.category} id={link?.id} height={"60px"} width={"60px"} onClick={() => openModal(link)} />
            ))}
          </div>
        </div>
        <div>
          <p className='Heading' style={{ textAlign: 'center' }}>Your Work Links</p>
          <div className='icon-edit-container'>
            {Uselink.filter(link => link.category === 'work').map((link) => (
              <img key={link.id} src={link?.src} alt={link?.category} id={link?.id} height={"60px"} width={"60px"} onClick={() => openModal(link)} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className='desu-but'
          onClick={updateLinkList}
        >
          Update Links
        </button>
      </div>

      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Edit Link</h2>
            <img src={selectedLink?.src} alt="Selected logo" width="100px" height="100px" />
            <TextField
              label="URL"
              value={selectedLink?.url || ''}
              onChange={handleUrlChange}
              fullWidth
            />
            <button className='model-button' onClick={handleDelete}>Delete</button>
            <button className='model-button' onClick={handleSave}>Save</button>
            <button className='model-button' onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditLinks;
