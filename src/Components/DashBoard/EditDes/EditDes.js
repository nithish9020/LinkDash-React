import React, { useContext, useState } from 'react';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore'; // Import updateDoc
import { db } from '../../../Config/Firebase'; // Import your Firebase config
import './EditDes.css';
import { userAuthDetails } from '../MainDash';

const EditDes = () => {
  
  const userData = useContext(userAuthDetails); // Get user data from context

  const [name, setName] = useState(userData?.name || ""); 
  const [Role, setRole] = useState(userData?.Role || ""); 
  const [description, setDes] = useState(userData?.Description || "");
  const [skills, setSkills] = useState(userData?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [userId, setUserId] = useState(userData?.userId || "");

  // Function to remove a skill
  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prevSkills) => prevSkills.filter(skill => skill !== skillToRemove));
  };

  // Function to add a skill
  const handleAddSkill = (event) => {
    if (event.key === 'Enter' && newSkill.trim() !== '') {
      if (skills.length < 8) {
        if (!skills.includes(newSkill)) {
          setSkills((prevSkills) => [...prevSkills, newSkill]);
          setNewSkill(''); // Clear the input after adding
        } else {
          toast.error("Skill already exists!", { position: "bottom-right" });
        }
      } else {
        toast.error("Maximum Skill Limit reached!", { position: "bottom-right" });
      }
    }
  };

  // Function to update the user description in Firestore
  const handleUpdate = async () => {
    try {
      // Reference to the document in Firestore (replace 'Description' with your collection name)
      const docRef = doc(db, 'Description', userData?.email);

      // Update the document with the new data
      await updateDoc(docRef, {
        name: name,
        Role: Role,
        Description: description,
        skills: skills,
        userId: userId
      });

      toast.success("Description updated successfully!", {
        position: "bottom-right"
      });
    } catch (error) {
      toast.error("Error updating description: " + error.message, {
        position: "bottom-right"
      });
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className='EditDes-container'>
      <div>
        <p className='Heading'>Edit Description</p>
      </div>
      <div className='input-box-container'>
        <div className='Flex-box'>
          <TextField
            id="user-id-box"
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            variant="standard"
            sx={{ width: "30%" }}
          />
          <TextField
            id="name-box"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="standard"
            sx={{ width: "30%" }}
          />
          <TextField
            id="role-box"
            label="Role"
            value={Role}
            onChange={(e) => setRole(e.target.value)}
            variant="standard"
            sx={{ width: "30%" }}
          />
        </div>
        <div style={{ width: "82%" }}>
          <TextField
            id="description-multiline"
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDes(e.target.value)}
            variant="standard"
            fullWidth
          />
        </div>
      </div>
      <div className='Skill-container input-box-container'>
        <p className='Heading'>Skills</p>
        <TextField
          id="skill-add"
          label="Add Skill"
          variant="standard"
          value={newSkill}
          onChange={(event) => setNewSkill(event.target.value)}
          sx={{ width: "90%" }}
          onKeyDown={handleAddSkill}  // Handle adding new skill on Enter
        />
        <div className='skill-button-container'>
          {skills.map((skill) => (
            <button 
              key={skill} 
              className="skill-button"
              onClick={() => handleRemoveSkill(skill)}  // Handle skill removal
            >
              {skill} ✖
            </button>
          ))}
        </div>
      </div>
      <div>
        <button className='desu-but' onClick={handleUpdate}>
          Update Description
        </button>
      </div>
    </div>
  );
};

export default EditDes;
